import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  panelOpenState = false;

  properties;
  user;

  status

  constructor(
    private router: Router,
    private _user: UsersService,
    private _propertie: PropertiesService,
    private _Activatedroute: ActivatedRoute,
  ) {
    this.status = this._Activatedroute.snapshot.paramMap.get("status");
    console.log(status);
  }

  ngOnInit() {
    if (this.status == undefined || this.status == null){
      this.listProperties();
    }else{
      this.listProperties();
    }
    this.getUserDados();
  }

  listProperties(){
    this._propertie.list().subscribe((data) => {
      console.log(data.propertie);
      this.properties = data.propertie;
    }, error => {
      console.log(error);
    });
  }


  createProperties() {
    this.router.navigate(["/properties"]);
  }

  logoff(){
    this._user.logoff();
    this.router.navigate(['/']);
  }

  getUserDados(){
    let sessao = JSON.parse(localStorage.getItem('sessao'));
    this.user = sessao.user;
  }

  deletePropertie(id){
    console.log(id);
    this._propertie.delete(id).subscribe(() => {
      this.listProperties();
    }, error => {
      console.log(error);
    })
  }

  editPropertie(id, type){
    this.router.navigate(['/properties/edit/'+id+'/'+type]);
  }

}
