import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users: any={
    admin :{password:'1234',roles:['STUDENT','ADMIN']},
    user1 :{password:'1234',roles:['STUDENT']},
  }
  //enregistrer l utilisateur authentifie
  public username!: any;
  public  isAuthenticated!: boolean;
  public roles: string[]=[]
  constructor(private router:Router) { }

  public login(username:string , password:string){
      if(this.users[username] && this.users[username]['password']==password){
        this.username=username;
        this.roles=this.users[username]['roles'];
        this.isAuthenticated=true;
        return true;
      }
      return false;
  }

  logout() {
    this.isAuthenticated=false;
    this.username=undefined;
    this.roles=[];
    this.router.navigateByUrl("/login")
  }
}
