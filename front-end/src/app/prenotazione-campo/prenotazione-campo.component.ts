import { Component, OnInit } from '@angular/core';
import { PrenotazioneCampoService } from '../service/prenotazione-campo.service';
import { PrenotazioneCampo } from '../class/prenotazione-campo';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Campo } from '../class/campo';

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

  openDatePickerBoolean: boolean = false
  model: NgbDateStruct;
  date: {year: number, month: number};
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
  pickDates:NgbDateStruct[]=[]
  campo: Campo[] = []
  illuminazioneCampo: boolean[] = []

  ngOnInit(): void {
    if (sessionStorage.getItem("Role") === "ROLE_ADMIN") {
      this.admin = true
    } else if (sessionStorage.getItem("Role") === "ROLE_USER") {
      this.visitor = true
    }
    this.service.getCampi().subscribe(campi => {
      this.campo = campi
      this.campo.forEach(c => {
        if(c.illuminazione){
          this.illuminazioneCampo[c.id] = true
        }else{
          this.illuminazioneCampo[c.id] = false
        }
      })
    })
    this.service.vediPrenotazioniCampi().subscribe(prenotazione => {

      this.prenotazioneList = prenotazione

      this.prenotazioneList.forEach(p => {
        if (p.prenotato) {
          this.prenotazioniEffettuate.push(p)
        } else {
          this.prenotazioniNonEffettuate.push(p)
        }
      })
      
      this.prenotazioniEffettuate.forEach(a => {
        this.disableArrived = a.data
        let yearValue: string = this.disableArrived.toString().split("-")[0]
        let monthValue = this.disableArrived.toString().split("-")[1]
        let dayValue = this.disableArrived.toString().split("-")[2]
        this.pickDates.push({ year: parseInt(yearValue), month: parseInt(monthValue), day: parseInt(dayValue)})
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

  openDatePicker(){
    this.openDatePickerBoolean = true
  }

  prenotaCampo(c: Campo){
    this.service.prenotazioneCampo(c, c.id).subscribe()
    window.location.reload();
  }

  isDisabled = (date:NgbDateStruct,current: {month: number,year:number})=>
  this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;

  isSelectable = (date:NgbDateStruct,current: {month: number,year:number})=>
  this.pickDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
}