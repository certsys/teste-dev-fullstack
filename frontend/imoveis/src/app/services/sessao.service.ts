import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  sessao = JSON.parse(localStorage.getItem('sessao'));
  logoff: any;

  constructor(private router: Router) { }

  canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
          console.log('TESTE: ', this.sessao);
            if(this.sessao){
                console.log('ENTRA NO IF');
                return true;
            }
            else {
              console.log('ENTRA NO ELSE');
                this.router.navigate(['/login']);
                return false;
            }
        }
}
