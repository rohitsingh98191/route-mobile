import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl:string = `https://reqres.in/api/`;
  public msg:string;
  constructor(private http:HttpClient) { }

  public login(value){
   return this.http.post(`${this.apiUrl}login`,value);
  }

  public getUserList(pageNo:number){
    return this.http.get(`${this.apiUrl}users?page=${pageNo}`);
  }

  public storeToken(token:string){
    localStorage.setItem('token',token);
  }

  public isAuthenticated():boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  public activeModal(value){
    this.msg = value
  }
}
