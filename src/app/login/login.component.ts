import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mfa = '';
  errorMessage = '';

  constructor(private router:Router){}

  login(){
    if (this.email === 'prueba@nuvantglobal.com' && this.password === 'Nu12345' && this.mfa === '123456'){
      this.router.navigate(['/home']);
    } if (this.email === '' || this.password === '' || this.mfa === '') {
      this.errorMessage = "Campos vacíos"}
      else {
      this.errorMessage = 'Los datos que ingresaste son incorrectos';
    }
  }

}
