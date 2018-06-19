import { NgModule } from '@angular/core';
import { ItemsComponent } from './items/items';
import { ItemComponent } from './item/item';
@NgModule({
	declarations: [ItemsComponent,
    ItemComponent],
	imports: [],
	exports: [ItemsComponent,
    ItemComponent]
})
export class ComponentsModule {}
