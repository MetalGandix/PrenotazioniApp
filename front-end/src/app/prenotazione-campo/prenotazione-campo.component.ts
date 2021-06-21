import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';


import { NgxSpinnerService } from "ngx-spinner";
import { PrenotazioneCampoService } from '../service/prenotazione-campo.service';
import { PrenotazioneCampo } from '../class/prenotazione-campo';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    this.model = calendar.getToday();
  }

  model: NgbDateStruct;
  visitor: boolean = false
  admin: boolean = false
  prenotazioneList: PrenotazioneCampo[] = []
  prenotazione: PrenotazioneCampo
  prenotazioniEffettuate: PrenotazioneCampo[] = []
  prenotazioniNonEffettuate: PrenotazioneCampo[] = []
  disabled: boolean = true
  disableArrived: Date = new Date();
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  disabledDates:NgbDateStruct[]=[]

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
      
      this.prenotazioniNonEffettuate.forEach(a => {
        this.disableArrived = a.data
        let yearValue: string = this.disableArrived.toString().split("-")[0]
        let monthValue = this.disableArrived.toString().split("-")[1]
        let dayValue = this.disableArrived.toString().split("-")[2]
        this.disabledDates.push({ year: parseInt(yearValue), month: parseInt(monthValue), day: parseInt(dayValue)})
      })

      console.log("Lista Prneotazioni: ", this.prenotazioneList)
      console.log("Lista Prenotazioni Effettuate: ", this.prenotazioniEffettuate)
      console.log("Lista Prenotazioni Non Effettuate: ", this.prenotazioniNonEffettuate)
    })
  }

  prenotaCampo(p: PrenotazioneCampo){
    this.service.prenotazioneCampo(p.campo, p.id).subscribe()
    window.location.reload();
  }

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

  isDisabled = (date:NgbDateStruct,current: {month: number,year:number})=>
  this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
}