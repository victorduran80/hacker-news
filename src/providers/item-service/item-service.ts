import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as isEqual from 'lodash.isequal';
import 'rxjs/add/operator/distinctUntilChanged';
//import { map, take } from 'rxjs/operators';
import { Items } from '../../model/items.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from '../../model/item.model';

export interface Query{
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable()
export class ItemServiceProvider {
  queries: Subject<Query>;

  constructor(private af: AngularFireDatabase) {
    console.log('Hello ItemServiceProvider Provider');
    this.queries = new Subject<Query>();
  }

  loadTeste(offset: number = 0, limit: number = 10): Observable<any[]>{
    return this.af.list('/v0/topstories').valueChanges();
    //.map(ids => ids.slice(offset, offset + limit))
  }
  

  load(query: Query){
    this.queries.next(query);
  }

  get(): Observable<Items>{
    const rawItemsIds = this.af.list('/v0/topstories').valueChanges()
      .map(ids => ids);
    const itemIds = Observable.combineLatest(
      rawItemsIds,
      this.queries,
      (ids, query) => ({ids, query}),
    ).filter(v => v.query.refresh)
    .pluck('ids');
    const selector = ({offset, limit}, ids) => ({
      offset,
      limit,
      total: ids.length,
      results: ids.slice(offset, offset + limit)
        .map(id => this.af.object<Item>('/v0/item/' + id).valueChanges())
    });
    return Observable.merge(
      this.queries.combineLatest(itemIds, selector).take(1),
      this.queries.skip(1).withLatestFrom(itemIds, selector)
    );
  }

  //nesse caso results é atruibuido um array simples de Item
  loadSimple(offset: number = 0, limit: number = 10) : Observable<any>{
    return this.af.list('/v0/topstories').valueChanges()
      .map(ids => ids.slice(offset, offset + limit))
      .mergeMap((ids: any[]) => Observable.combineLatest(...(ids.map(id =>
        this.af.object<Item>('/v0/item/' + id).valueChanges()))))
        .map(items => ({
          offset,
          limit,
          total: limit,
          results: items
        }))
        ;
  }

  //nesse caso results é atribuido um array de Observables de Item
  loadDistinct(offset: number = 0, limit: number = 10): Observable<Items>{
     return this.af.list('/v0/topstories').valueChanges()
      .map(ids => ids.slice(offset, offset + limit).map(v => v))
      .distinctUntilChanged(isEqual)
      .map((ids: any[]) => ids.map(id => this.af.object<Item>('/v0/item/' + id).valueChanges()))
      .map(items => ({
        offset,
        limit,
        total: limit,
        results: items
      }));
      
    
  }
  
}
