import { Component, Input } from '@angular/core';
import { Item } from '../../model/item.model';

/**
 * Generated class for the ItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;
  text: string;

  constructor() {
    console.log('Hello ItemComponent Component');
    this.text = 'Hello World';
  }

}
