import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../class/prenotazione';
import { User } from '../class/user';
import { GestioneUtenteService } from '../service/gestione-utente.service';
import { PrenotazioneService } from '../service/prenotazione.service';

@Component({
  selector: 'app-info-visitatore',
  templateUrl: './info-visitatore.component.html',
  styleUrls: ['./info-visitatore.component.css']
})
export class InfoVisitatoreComponent implements OnInit {

  visitor: boolean = false
  constructor(private gestioneUtente: GestioneUtenteService, private service: PrenotazioneService) {
  }
  utente: User
  visita: Prenotazione[]
  user: User
  dialog: boolean = false
  id: number
  socio: string

  ngOnInit() {
    this.gestioneUtente.findUtenteSingoloLogin(sessionStorage.getItem('username')).subscribe(data => {
      this.utente = data
      this.socio="SI"
      if(!this.utente.is_socio)
      this.socio="No"
      console.log(this.utente)
    })
    console.log("Session storage", sessionStorage.getItem('username'))
    this.service.prendiVisitaDalVisitatore(sessionStorage.getItem('username')).subscribe(p => {
      this.visita = p
    })
  }


  setChangeUserDetail() {
    this.gestioneUtente.changeUserDetail(this.utente).subscribe()
   return true;
  }

  takeId(id: number) {
    console.log(id)
    this.id = id
  }

  cancellaVisita() {
    this.dialog = true

    this.service.deletePrenotazione(this.id).subscribe()
    location.reload();
    return("{}")

  }
}

