import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';


import { NgxSpinnerService } from "ngx-spinner";
import { PrenotazioneCampoService } from '../service/prenotazione-campo.service';
import { PrenotazioneCampo } from '../class/prenotazione-campo';

@Component({
  selector: 'app-prenotazione-campo',
  templateUrl: './prenotazione-campo.component.html',
  styleUrls: ['./prenotazione-campo.component.css']
})
export class PrenotazioneCampoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PrenotazioneCampoService
  ) {
    this.prenotazione = new PrenotazioneCampo()
  }

  visitor: boolean = false
  admin: boolean = false
  prenotazioneList: PrenotazioneCampo[] = []
  prenotazione: PrenotazioneCampo
  prenotazioniEffettuate: PrenotazioneCampo[] = []
  prenotazioniNonEffettuate: PrenotazioneCampo[] = []

  ngOnInit(): void {
    if (sessionStorage.getItem("Role") === "ROLE_ADMIN") {
      this.admin = true
    } else if (sessionStorage.getItem("Role") === "ROLE_USER") {
      this.visitor = true
    }
    this.service.vediPrenotazioniCampi().subscribe(prenotazione => {
      this.prenotazioneList = prenotazione
      this.prenotazioneList.forEach(p => {
        if (p.prenotato) {
          this.prenotazioniEffettuate.push(p)
        } else {
          this.prenotazioniNonEffettuate.push(p)
        }
      })
      console.log("Lista Prneotazioni: ", this.prenotazioneList)
      console.log("Lista Prenotazioni Effettuate: ", this.prenotazioniEffettuate)
      console.log("Lista Prenotazioni Non Effettuate: ", this.prenotazioniNonEffettuate)
    })
  }

  //passare Id,Campo,Username
  // prenotaCampo(p: PrenotazioneCampo) {
  //   this.service.salvaPrenotazioneCampo(this.prenotazione).subscribe()
  // }

  prenotaCampo(p: PrenotazioneCampo){
    this.service.prenotazioneCampo(p.campo, p.id).subscribe()
  }

}