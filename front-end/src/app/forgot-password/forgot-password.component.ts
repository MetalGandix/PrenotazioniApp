import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestioneUtenteService } from '../service/gestione-utente.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: GestioneUtenteService, private router: ActivatedRoute) { }

  username: string
  tokenExist: boolean = false
  password: string

  ngOnInit(): void {
    this.router.params.subscribe(r => {
      let token = r["tokenid"]
      if(token){
        this.tokenExist = true
      }
      console.log(token)
    })
  }
  resetPassword() {
    console.log(this.username)
    this.service.resetPassword(this.username).subscribe()
  }
  cambiaPassword() {
    console.log(this.password)
    // this.service.resetPassword(this.username).subscribe()
  }
}
