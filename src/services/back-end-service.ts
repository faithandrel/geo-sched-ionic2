import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { SchdStorage } from './schd-storage';


@Injectable()
export class BackEndService {
  backEndUrl = 'http://8ffbaae0.ngrok.io/';  // URL to web api
  backEndToken: any;
  private signupSession: string;
  theResponse: any;
  jwtToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http: Http,
              private storage: SchdStorage) {
  }
  
  getBackEndToken(): Promise<any> {
    return this.http.get(this.backEndUrl+'test-token')
               .toPromise()
               .then(res => {
                  let data = res.json();
                  this.backEndToken = data.token;
                  //return res.json();
                })
               .catch(this.handleError);
  }
  
  //TODO: probably move to own service
  private prepareHttpRequest(body: string, url: string, withAuth: boolean, method) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if(withAuth === true) {
       var auth = 'Bearer ' + this.getJwtToken();
       myHeaders.append('Authorization', auth);
    }

    var options = new RequestOptions({
      method: method,
      url: this.backEndUrl + url,
      headers: myHeaders,
      body: body
    });
    return new Request(options);
  }

  addNewUser (name: string) {
    let body = "title=" + name + "&_token=" + this.backEndToken;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'test-save-from-app',
      headers: myHeaders,
      body: body
    });
    var req = new Request(options);
    
    console.log(myHeaders);
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }

  facebookSignUp(newUser) {
    let body = "username=" + newUser.username + 
              "&facebook=" + newUser.facebook + 
              "&access=" + newUser.fbToken + 
              "&_token=" + this.backEndToken;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.backEndUrl+'fb-sign-up',
      headers: myHeaders,
      body: body,
    });
    var req = new Request(options);
    
    console.log(myHeaders);
    return this.http.request(req)
          .toPromise()
          .then(res => {
            console.log(res);
            //open(this.backEndUrl+'sign-up-facebook?signup='+this.signupSession);
          })
          .catch(this.handleError);
    
  }
  
  getItems(): Promise<any> {
    var req = this.prepareHttpRequest('', 'get-items', true, RequestMethod.Get);
    
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }
  
  saveItem(item): Promise<any> {
    var body = JSON.stringify(item);

    var req = this.prepareHttpRequest(body, 'save-item', true, RequestMethod.Post);
    
    return this.http.request(req)
          .toPromise()
          .then(res => JSON.stringify(res.json()))
          .catch(this.handleError);
  }

  getSingleItem(itemId: number): Promise<any> {
    var req = this.prepareHttpRequest('', 'item/'+ itemId, true, RequestMethod.Get);
    
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }
  
  getSavedJwt() {
    return this.storage.getSavedJwt().then(profile => {
      this.jwtToken = profile;
    });
  }
  
  getJwtToken() {
    return this.jwtToken;
  }

  getExpiryDate() {
    return this.jwtHelper.getTokenExpirationDate(this.jwtToken)
  }
  
  authSuccess(token) {
    this.storage.setJwt(token);
  }
  
  isLoggedIn() {
    return tokenNotExpired('id_token', this.jwtToken);
  }
  
  loginWithPassword(userObject) {
    userObject._token = this.backEndToken;
    let body = JSON.stringify(userObject);
    
    var req = this.prepareHttpRequest(body, 'password-log-in', false, RequestMethod.Post);
    
    return this.http.request(req)
          .toPromise()
          .then(res => {
            let data = res.json();
            if (data.token != undefined ) {
              this.authSuccess(data.token);
              this.jwtToken = data.token;
              return true;
            }
            else {
              return false;
            }
          })
          .catch(this.handleError);
  }
  
  loginWithFacebook(userObject) {
    userObject._token = this.backEndToken;
    let body = JSON.stringify(userObject);
    
    var req = this.prepareHttpRequest(body, 'facebook-log-in', false, RequestMethod.Post);
    
    return this.http.request(req)
          .toPromise()
          .then(res => {
            let data = res.json();
            if (data.token != undefined ) {
              this.authSuccess(data.token);
              this.jwtToken = data.token;
              return true;
            }
            else {
              return false;
            }
          })
          .catch(this.handleError);
  }

  getExploreFeed(): Promise<any> {
    var req = this.prepareHttpRequest('', 'explore-feed', true, RequestMethod.Get);
    
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }

  getEmojiFeed(emoji): Promise<any> {
    let body = JSON.stringify({emoji: emoji});
    var req = this.prepareHttpRequest(body, 'emoji', true, RequestMethod.Post);
    
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }

  getNotifications(): Promise<any> {
    var req = this.prepareHttpRequest('', 'notifications', true, RequestMethod.Get);
    
    return this.http.request(req)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}