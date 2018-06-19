import { Component, Input } from '@angular/core';
import { Items } from '../../model/items.model';

/**
 * Generated class for the ItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'items',
  templateUrl: 'items.html'
})
export class ItemsComponent {
  @Input() items: Items;
  constructor() {
    
  }

}
