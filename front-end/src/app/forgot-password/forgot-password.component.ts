import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestioneUtenteService } from '../service/gestione-utente.service';
import { User } from '../class/user';

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
  user: User;
  token: string

  ngOnInit(): void {
    this.router.params.subscribe(r => {
      let token = r["tokenid"]
      this.token = token
      if (token) {
        this.tokenExist = true
      }
      this.service.getUtenteFromToken(this.token).subscribe(utente => {
        this.user = utente
        console.log("Utente trovato: ",this.user)
      })
      console.log(token)
    })
  }

  resetPassword() {
    console.log(this.username)
    this.service.resetPassword(this.username).subscribe()
  }

  cambiaPassword() {
    if (this.tokenExist) {
      console.log(this.password)
      console.log(this.user.username)
      console.log(this.user)
      this.user.password = this.password;
      this.service.changeUserDetail(this.user).subscribe()
    } else {
      return "Token non trovato"
    }
  }
}

