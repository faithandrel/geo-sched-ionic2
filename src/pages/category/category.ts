import { ArticleComponent } from './../../components/article/article';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import {BackEndService} from '../../services/back-end-service';
import {SchdErrorHandler} from '../../services/schd-error-handler';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  category: string;  
  items: any;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler) { 
    this.category = 'travel';
    this.refreshPage();
  }

  openArticle() {
    let modal = this.modalCtrl.create(ArticleComponent, {
      article: {
        title: 'Lets not React',
        author: 'Craig Michaels',
        tags: ['React', 'JS'],
        img: 'm2.jpg'
      }
    })
    modal.present();
  }

  refreshPage() {
    this.backEndService
        .getItems()
        .then(res => this.items = res)
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });
  }

}
