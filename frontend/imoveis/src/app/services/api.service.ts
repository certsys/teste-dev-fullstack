import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._auth.getToken()}`
      })
    }
   }
   error(error): any {
    if (error.status == 400)
      error.data = JSON.parse(error._body)

    throw error;
  }

  public get(path: string, Params?: HttpParams): Observable<any> {
    return this._http.get(`${environment.API_URL}/${path}`, {
      params: Params, headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${this._auth.getToken()}`})
    })
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this._http.put(
      `${environment.API_URL}/${path}`,
      JSON.stringify(body), { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${this._auth.getToken()}`})});
  }

  public delete(path: string): Observable<any> {
    return this._http.delete(
      `${environment.API_URL}/${path}`, { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${this._auth.getToken()}`})});
  }

  public patch(path: string, body: object = {}): Observable<any> {
    return this._http.patch(
      `${environment.API_URL}/${path}`,
      JSON.stringify(body), { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${this._auth.getToken()}`})});
  }

  public post(path: string, body: object = {}): Observable<any> {

    let header = new HttpHeaders();

    if (path != 'auth/signin'){
      header = new HttpHeaders({ 'Authorization': `Bearer ${this._auth.getToken()}` })
    }

    return this._http.post(
      `${environment.API_URL}/${path}`, body, { headers: header});
  }
}
