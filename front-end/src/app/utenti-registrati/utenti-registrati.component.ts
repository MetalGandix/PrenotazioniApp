import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { GestioneUtenteService } from '../service/gestione-utente.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-utenti-registrati',
  templateUrl: './utenti-registrati.component.html',
  styleUrls: ['./utenti-registrati.component.css']
})
export class UtentiRegistratiComponent implements OnInit {

  constructor(private route: Router,
    private service: GestioneUtenteService, private spinner: NgxSpinnerService) { }

  admin: boolean = false
  utente: User[]

  ngOnInit() {
    this.spinner.show
    this.admin = sessionStorage.getItem("Role") === "ROLE_ADMIN"
    this.service.findAll().subscribe(data => {
      this.utente = data
      console.log(this.utente)
      this.spinner.hide()
    })
  }

  deleteUtente(id: number) {
    var sei_sicuro = confirm('Confermare eliminazione di questo utente?');
    if (sei_sicuro) {
      this.spinner.show()
      this.service.deleteUser(id).subscribe()
      this.spinner.hide()
      window.setTimeout('location.reload()', 100);
    } else {
      alert('Utente NON eliminato');
    }
  }

  nominaAdmin(id: number) {
    var sei_sicuro = confirm('Confermare nomina admin?');
    if (sei_sicuro) {
      this.spinner.show()
      this.service.changeRole(id).subscribe()
      this.spinner.hide()
      window.setTimeout('location.reload()', 100);
    } else {
      alert('Utente NON nominato Admin');
    }
  }
}
