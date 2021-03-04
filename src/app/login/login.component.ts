import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  @ViewChild('mymodal',{static:true}) public mymodal:any;
  errorText:string;
  constructor(private authService:AuthService,private fb: FormBuilder,private router: Router,private modalService: NgbModal) { }

  ngOnInit() {
    this.initalizeLoginForm();
    this.authService.msg && this.open(this.mymodal);
  }

  private initalizeLoginForm(){
   this.loginForm =   this.fb.group({
        email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password:['',[Validators.required]],
      })
  }

  public submitLoginForm(value){
    this.authService.login(value).toPromise().then((res:any)=>{
      const { token }  = res;
      if(token){
        this.authService.storeToken(token);
        this.router.navigate([`/user-list`],{queryParams:{page:1}});
      }
    }).catch(({error}:any)=>{
      this.errorText = error.error;
      this.open(this.mymodal);
    })
  }

  public open(content){
    this.authService.msg ? this.errorText = this.authService.msg:null;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    },(close)=>{
      this.authService.msg = '';
    });

  }
}
