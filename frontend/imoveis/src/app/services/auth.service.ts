import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string {
    let _sessao = JSON.parse(localStorage.getItem('sessao'));
    if(_sessao){
      console.log('TOKEN: ', _sessao.token);
      let token = _sessao.token;

      return token;
    }
  }
}
