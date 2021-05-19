import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrenotazioneCampo } from '../class/prenotazione-campo';
import { User } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneCampoService {



  private url: string

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/';
  }


  public vediPrenotazioniCampi(): Observable<PrenotazioneCampo[]> {
    return this.http.get<PrenotazioneCampo[]>(this.url + "vediprenotazioniCampi");
  }

  public salvaPrenotazioneCampo(prenotazione: PrenotazioneCampo) {
    return this.http.post<PrenotazioneCampo>(this.url + "prenotazioneCampo", prenotazione);
  }

  public deletePrenotazione(id: number){
    return this.http.delete<PrenotazioneCampo>(this.url + "cancellaPrenotazioneCampo/" + id);
  }

  // public prendiUtenteDaPrenotazione(prenotazione: PrenotazioneCampo): Observable<User[]> {
  //   return this.http.get<User[]>(this.url + "prendiUtenteLoggatoxCampi/" + prenotazione)
  // }

  public prendiPrenotazioneDaUtente(username: User): Observable<PrenotazioneCampo[]> {
    return this.http.get<PrenotazioneCampo[]>(this.url + "prendiVisitaUtente/" + username)
  }


  









}