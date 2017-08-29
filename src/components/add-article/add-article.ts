import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';

/*
  Generated class for the AddArticle component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-article',
  templateUrl: 'add-article.html'
})
export class AddArticleComponent {

  article: any;
  newItem: any;

  constructor(public viewCtrl: ViewController, 
              private formBuilder: FormBuilder,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation
               ) {

    this.article = this.formBuilder.group({
      title: ['', Validators.required],
      contentBody: ['', Validators.required],
      recurring: ['false']
    });

  }

  saveForm() {
    console.log(this.article.value);
    
    var item     = {};
    this.newItem = {
      title: this.article.get('title').value,
      content: this.article.get('contentBody').value,
    };

    this.schdLocation.checkGeo()
    .then(res => {
      return this.schdLocation.getGeo();
    })
    .then(res => {
      item = Object.assign(this.newItem, res);
      return this.backEndService.saveItem(item);
    })
    .then(res => {
        this.schdErrorHandler.showSchdError(res);
    })
    .catch(error => {
        this.schdErrorHandler.showSchdError(error);
    });
 
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }



}
