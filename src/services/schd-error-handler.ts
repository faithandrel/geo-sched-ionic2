import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Network, Diagnostic } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SchdErrorHandler {

  constructor(public toastCtrl: ToastController) {
  }
  
  showSchdError(theError: any) {
    let toast = this.toastCtrl.create({
      message: JSON.stringify(theError),
      duration: 3000,
    });
    
    toast.present();

  }
  
  checkWeb() {
    if (Network.type == 'none') {
      let toast = this.toastCtrl.create({
        message: 'No connection.',
        //duration: 10000,
      });
      toast.present();
    } 
  }
  
  
  
}