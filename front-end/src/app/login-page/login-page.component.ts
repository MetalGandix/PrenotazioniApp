import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Z_ASCII } from 'zlib';
import { User } from '../class/user';
import { AuthenticationService } from '../service/authentication.service';
import { GestioneUtenteService } from '../service/gestione-utente.service';
import { RegistrazioneService } from '../service/registrazione.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginservice: AuthenticationService,
    private gestioneUtenteService: GestioneUtenteService,
    private registrazione: RegistrazioneService) { }

  logEffettuato: boolean = true
  user: User
  username = ''
  password = ''
  invalidLogin = false
  loginErrato: boolean = false
  refresha: number = 1
  booleanErrorToken: boolean = false
  booleanGet: boolean = false
  connessioneFallita: boolean = false

  ngOnInit(): void {
  }


  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.user = data
        if (this.user.enabled == true) {

          this.router.navigate(['/scelta-utente'], {
            state: {
              refresha: this.refresha
            }
          })
        }
        else {
          this.booleanErrorToken = true
        }
      },
      error => {
        if (error.status == 400 || error.status == 401) {
          this.loginErrato = true
          setTimeout(() => {

            this.loginErrato = false
          }, 4000)


        } else if (error.status == 500 || error.status == 501) {
          this.connessioneFallita = true
          setTimeout(() => {

            this.connessioneFallita = false

          }, 4000)




        }
      })
  }
}

