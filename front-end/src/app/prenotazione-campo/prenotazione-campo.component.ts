import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';


import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-prenotazione-campo',
  templateUrl: './prenotazione-campo.component.html',
  styleUrls: ['./prenotazione-campo.component.css']
})
export class PrenotazioneCampoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) { }

   

    visitor: boolean = false
    admin: boolean = false
    

  ngOnInit(): void {
    
    if(sessionStorage.getItem("Role") === "ROLE_ADMIN"){
      this.admin = true
    }else if(sessionStorage.getItem("Role") === "ROLE_USER"){
      this.visitor = true
    }
  }




  
}
