import { Component, EventEmitter, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Output } from '@angular/core';
import { GestioneUtenteService } from '../service/gestione-utente.service';
import { User } from '../class/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  @Output() sidenavClose = new EventEmitter();

    utente: User
    visitor: boolean = false
    admin: boolean = false
    session

  constructor(private breakpointObserver: BreakpointObserver, private gestioneUtente: GestioneUtenteService, private auth: AuthenticationService) {}

  ngOnInit(){
    if(sessionStorage.getItem("Role") === "ROLE_ADMIN"){
      this.admin = true
    }else if(sessionStorage.getItem("Role") === "ROLE_USER"){
      this.visitor = true
    }
    this.session = sessionStorage.getItem('username')
    this.gestioneUtente.findUtenteSingolo(sessionStorage.getItem('username')).subscribe(data => 
      {
        this.utente = data
      })
    }

    logOut() {
      this.auth.logOut()
    }

    
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  // public onSidenavClose = () => {
  //   this.sidenavClose.emit();
  // }

}
