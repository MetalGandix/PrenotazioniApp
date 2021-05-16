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

  ngOnInit(): void {
    this.router.params.subscribe(r => {
      let token = r["tokenid"]
      if (token) {
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
    if (this.tokenExist) {
      console.log(this.password)
      console.log(this.username)
      // this.service.resetPassword(this.username).subscribe()
      this.service.findUtenteSingoloLogin(this.username).subscribe(u => {
        if (u!=null) {
          this.user = u
          console.log(this.user)
        }else{return "Utente non trovato."}
      }
      )
      this.user.password=this.password;
      console.log(this.user)
      // this.service.changeUserDetail(this.user)
    }else{ 
      
      console.log(this.user)
      return "Token non trovato"}
    
  }
}

