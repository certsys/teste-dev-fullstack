import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss']
})
export class PropertiesPage implements OnInit {
  loading = false;
  create: FormGroup;
  submit: boolean = false;

  notificationError: boolean = false;
  errorMsg: string;

  notificationSuccess: boolean = false;
  msgSuccess: string;

  propertieId;
  type;

  dados;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _propertie: PropertiesService,
    private _authService: AuthService,
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute
  ) {
    this.propertieId = this._Activatedroute.snapshot.paramMap.get('id');
    this.type = this._Activatedroute.snapshot.paramMap.get('type');

    console.log(this.propertieId, this.type);
  }

  ngOnInit() {
    this.create = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      amount: this.fb.control('', [Validators.required]),
      size: this.fb.control('', [Validators.required]),
      street: this.fb.control('', [Validators.required]),
      number: this.fb.control('', [Validators.required]),
      complement: this.fb.control('', [Validators.required]),
      district: this.fb.control('', [Validators.required]),
      zipe_code: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required])
    });

    if (this.propertieId) {
      this.getPropertieId(this.propertieId);
    }
  }

  back(status) {
    this.create.reset();
    this.propertieId = null;
    this.type = null;
    this.router.navigate(['/home/return/' + status]);
  }

  consultaCep() {
    let cep = this.create.value.zipe_code;

    // Variavem cep somente com os digitos numericos
    cep = cep.replace(/\D/g, '');
    // verifica se o cep possui o valor informado
    if (cep != '') {
      // Validar cep
      var validacep = /^[0-9]{8}$/;

      // valida o formato do cep
      if (validacep.test(cep)) {
        this.http
          .get(`http://viacep.com.br/ws/${cep}/json`)
          .toPromise()
          .then(data => {
            this.populaDadosEnd(data);
          })
          .catch(erro => {
            console.log(erro);
          });
      }
    }
  }

  populaDadosEnd(data) {
    let endereco = this.create;
    endereco.patchValue({
      street: data.logradouro,
      complement: data.complemento,
      district: data.bairro,
      city: data.localidade,
      state: data.uf
    });
  }

  createPropertie() {
    let dados = this.create.value;
    if (this.type === '1') {
      this._propertie.edit(this.propertieId, dados).subscribe(
        data => {
          this.create.reset();
          this.notificationSuccess = true;
          this.msgSuccess = 'Imóvel atualizado com sucesso!';
          setTimeout(() => {
            this.notificationSuccess = false;
            this.back(1);
          }, 3000);
        },
        error => {
          this.notificationError = true;
          this.errorMsg = 'Error ao editar o imóvel!';
          setTimeout(() => {
            this.notificationError = false;
          }, 3000);
        }
      );
    } else {
      this._propertie.create(dados).subscribe(
        data => {
          this.create.reset();
          this.notificationSuccess = true;
          this.msgSuccess = 'Imóvel cadastrado com sucesso!';
          setTimeout(() => {
            this.notificationSuccess = false;
          }, 3000);
        },
        error => {
          this.notificationError = true;
          this.errorMsg = 'Error ao cadastrar o imóvel!';
          setTimeout(() => {
            this.notificationError = false;
          }, 3000);
        }
      );
    }
  }

  getPropertieId(id) {
    this._propertie.getId(id).subscribe(
      data => {
        this.dados = data.propertie;
        console.log(this.dados);
        this.populaDadosEdit(data.propertie);
      },
      error => {
        console.log(error);
      }
    );
  }

  populaDadosEdit(dados) {
    let propertie = this.create;

    propertie.patchValue({
      title: dados.title,
      description: dados.description,
      amount: dados.amount,
      size: dados.size,
      street: dados.street,
      number: dados.number,
      complement: dados.complement,
      district: dados.district,
      zipe_code: dados.zipe_code,
      city: dados.city,
      state: dados.state
    });
  }
}
