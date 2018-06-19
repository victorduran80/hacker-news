import { Item } from "./item.model";
import { Observable } from 'rxjs/Rx';

//export type Items = Item[];
export interface Items{
    offset: number;
    limit: number;
    total?: number;
    results: Observable<Item>[];
}