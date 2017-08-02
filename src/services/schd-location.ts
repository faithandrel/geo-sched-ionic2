import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SchdLocation {
  
  locationStatus: any = false;
  public myLocation: any = false;
  geoStream: any = false;
  
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {
     this.geoStream = Geolocation.watchPosition();
  }
  
  toastGeo() {
    let myGeo = Geolocation.watchPosition();
    myGeo.subscribe(position => {
       let toast = this.toastCtrl.create({
          message: 'Geo '+ JSON.stringify(position),
          duration: 3000,
        });
        this.myLocation = {
          /*longitude: position.coords.longitude,
          latitude: position.coords.latitude*/
        }
        toast.present();
    });
  }
  
  monitorGeo() {
    this.geoStream.subscribe(position => {
       let toast = this.toastCtrl.create({
          message: 'Geo '+ JSON.stringify(position),
          duration: 3000,
        });
        this.myLocation = {
          /*longitude: position.coords.longitude,
          latitude: position.coords.latitude*/
        }
    });
  }
  
  getGeo(): Promise<any> {
    return Geolocation.getCurrentPosition().then((res) => {
      return { 
                latitude: res.coords.latitude,
                longitude: res.coords.longitude
              };
    }).catch((error) => {
      return error;
    });
  }

  checkGeo(): Promise<any> {
     return Diagnostic.isLocationEnabled().then(res => {
      if (!res) {
        return Promise.reject('Please turn on your GPS.');
      }
      return Promise.resolve(res);
    })
    .catch(e => {return Promise.reject(e)});
  }

  getGeoDeprecated(): Promise<any> {
    if (this.myLocation != false) {
      return Promise.resolve(this.myLocation);
    }
    else {
      return Promise.reject('Location not found.');
    }
    /*Geolocation.watchPosition().toPromise()
          .then(res => {
             let toast = Toast.create({
              message: 'Geo '+ JSON.stringify(res),
              duration: 3000,
            });
            
            nav.present(toast);
          });*/
  }
  
  checkGeoDeprecated() {
    let locInterval = Observable.interval(10000);
    let previousStatus = this.locationStatus;
    
    locInterval.subscribe(position => {
      Diagnostic.isLocationEnabled().then(res => {
            this.locationStatus = res;
            if (!res) {
              let toast = this.toastCtrl.create({
                message: 'Please turn on your GPS.',
                duration: 3000,
              });
              
              toast.present(toast);
            }
            //return this.getGeo();
        }).then(res => {
        },
        err => {
          if (this.locationStatus) {
              /*let alert = this.alertCtrl.create({
               title: 'GPS',
               subTitle: 'Restart app...' + JSON.stringify(previousStatus),
               buttons: [{
                          text: 'OK',
                          handler: () => {
                            location.reload();
                          }
                        }]
             });
             alert.present();*/
          }
          
        });
    });
    
    
  }
}