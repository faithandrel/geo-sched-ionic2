import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class SchdFacebook {

  constructor(private fb: Facebook) {
  }
  
  loginWithFacebook(): Promise<any> {
    return this.fb.login(['email'])
      .then((res: FacebookLoginResponse) => {
                  return res;
       })
      .catch(e => {return e});

  }
  
}