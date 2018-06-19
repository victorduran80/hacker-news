import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemServiceProvider } from '../../providers/item-service/item-service';
import { Items } from '../../model/items.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-top-stories',
  templateUrl: 'top-stories.html',
})
export class TopStoriesPage implements OnInit, OnDestroy {
  items: Items;
  its: any;
  subscription: Subscription;
  offset: number = 0;
  limit: number = 10;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private itemService: ItemServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopStoriesPage');
  }

  ngOnInit(): void{
    //atualização
    this.subscription = this.itemService.get().subscribe(items => this.items = items);
    this.doLoad(true);

    //funcionou
    //this.subscription = this.itemService.loadDistinct(0, 10).subscribe(items => this.items = items);    
    //this.its = this.itemService.loadTeste(0, 10);

    /*
    //teste de chamado que funciona. funciona com load tbm
    this.itemService.loadDistinct(0, 10)
    .subscribe(res => {
      console.log(res);
    })
    */

    /*
    this.itemService.loadTeste(0, 10)
      .map(ids => {
        //console.log(ids);
        return ids.slice(0, 10)
      })
      .mergeMap((ids: any[]) => {
        console.log(ids);
        return Observable.combineLatest(...(ids.map(id =>{
        console.log('val' + id);
        return id;
        })))
      }
      )      
      .subscribe((ids: any[]) => {
        console.log(ids);
      });
    */
      


    /*
    this.itemService.load(0, 10).subscribe(items => {
      this.items = items;
    })
    */
    /*
    this.subscription = this.itemService.loadTeste(0, 10).subscribe(items =>{
      console.log(items);
    })
    */
  }

  ngOnDestroy(): void{
    
    if (this.subscription)
      this.subscription.unsubscribe();
      
  }

  hasPrevious(): boolean{
    return this.offset > 0;
  }

  previous(): void{
    if (!this.hasPrevious())
      return;
    this.offset -= this.limit;
    this.doLoad(false);
  }

  hasNext(): boolean{
    return this.items != null && (this.offset + this.limit) < this.items.total;
  }

  next(): void{
    if (!this.hasNext())
      return;
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean{
    return this.items != null;
  }

  refresh(): void{
    if (!this.canRefresh())
      return;
    this.offset = 0;
    this.doLoad(true);

  }

  doLoad(refresh: boolean): void{
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh
    })
  }
}
