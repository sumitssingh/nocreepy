/**
 * Created by sumitsingh on 16/07/17.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CardComponent } from './swipe-cards.component';
import { TinderCardDirective } from './swipe-cards.directive';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pan': { enable: true }
  }
}

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CardComponent,
    TinderCardDirective
  ],
  exports: [
    CardComponent,
    TinderCardDirective
  ],
  entryComponents: [
    CardComponent
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }]
})
export class SwipeCardsModule { }
