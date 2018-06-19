import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimeAgoPipe } from '../pipes/time-ago/time-ago';
import { ItemServiceProvider } from '../providers/item-service/item-service';
import { AngularFireModule } from 'angularfire2';
import { TopStoriesPage } from '../pages/top-stories/top-stories';
import { ItemComponent } from '../components/item/item';
import { ItemsComponent } from '../components/items/items';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig ={
  databaseURL: 'https://hacker-news.firebaseio.com',
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemComponent,
    ItemsComponent,
    ListPage,
    TopStoriesPage,    
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TopStoriesPage    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemServiceProvider
  ]
})
export class AppModule {}
