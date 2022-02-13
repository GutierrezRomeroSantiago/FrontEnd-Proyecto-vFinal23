import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editus',
  templateUrl: './editus.component.html',
  styleUrls: ['./editus.component.css']
})
export class EditusComponent implements OnInit {
  usi: any
  form: FormGroup;
  usersApi: any

  constructor(private loginService: LoginService, private route: ActivatedRoute,  private fb: FormBuilder, private toastr: ToastrService) {
    this.usi = this.route.snapshot.paramMap.get("usuario");
    this.form = this.fb.group({
      _usuario: ['', Validators.required],
      _password: ['', Validators.required],
    })
   }

   edit(){

     this.loginService.getUnUs(this.usi).subscribe(data => {
       this.usersApi = data

       this.form.patchValue({
        _usuario: this.usersApi._usuario,
        _password: this.usersApi._password
       })
     })
   }
   modificar(){
     let a = this.form.get('_usuario')?.value
     let b = this.form.get('_password')?.value
     this.loginService.editatUs(this.usi,a,b ).subscribe(data => {
      this.toastr.success('Usuario Modificado', 'Gracias');
     })
   }

  ngOnInit(): void {
    this.edit();
  }

}
