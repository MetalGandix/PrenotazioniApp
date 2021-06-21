import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';


import { NgxSpinnerService } from "ngx-spinner";
import { PrenotazioneCampoService } from '../service/prenotazione-campo.service';
import { PrenotazioneCampo } from '../class/prenotazione-campo';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prenotazione-campo',
  templateUrl: './prenotazione-campo.component.html',
  styleUrls: ['./prenotazione-campo.component.css']
})
export class PrenotazioneCampoComponent implements OnInit {

  constructor(
    private service: PrenotazioneCampoService,
    calendar: NgbCalendar
  ) {
    this.prenotazione = new PrenotazioneCampo(),
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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

      for(let a: number = 0; this.prenotazioneList.length < 20; a++){
        let orario=0
        orario ++
        let orarioString = orario.toString();
        this.prenotazione.orario = orarioString
        this.prenotazioneList.push(this.prenotazione)
      }
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
    window.location.reload();
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}