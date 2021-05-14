import { Component, OnInit } from '@angular/core';
import { GestioneUtenteService } from '../service/gestione-utente.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private service: GestioneUtenteService) { }

  username: string

  ngOnInit(): void {

  }
 resetPassword(){
   console.log(this.username)
   this.service.resetPassword(this.username).subscribe()
 }
}
