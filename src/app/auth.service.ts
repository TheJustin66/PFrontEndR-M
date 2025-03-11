import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUser = {
    email: 'prueba@nuvantglobal.com',
    password: 'Nu12345',
    mfa: '123456'
  };

  login(email: string,password:string,mfa:string):boolean{
    return email === this.validUser.email && password === this.validUser.password && mfa === this.validUser.mfa;
  }
}
