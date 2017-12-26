import { InterestsPage } from './../interests/interests';
import { AddArticleComponent } from './../../components/add-article/add-article';
import { ModalController } from 'ionic-angular';
import { ExplorePage } from './../explore/explore';
import { CategoryPage } from './../category/category';
import { Component } from '@angular/core';

import { MojcNotification } from '../../services/mojc-notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  categoryRoot: any = CategoryPage;
  exploreRoot: any = ExplorePage;
  interestsRoot: any = InterestsPage;

  constructor(public modalCtrl: ModalController, 
              public notif: MojcNotification) {
  }

  addArticle() {
    let modal = this.modalCtrl.create(AddArticleComponent);
    modal.present();
  }
}
