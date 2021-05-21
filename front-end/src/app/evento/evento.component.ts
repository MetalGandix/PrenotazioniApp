import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../class/evento';
import { EventoService } from '../service/evento.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  selectedFile: File;
  http: any;
  admin: boolean = false
  evento: Evento
  showMsg: boolean = false
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private service: EventoService, private router: Router, private httpClient: HttpClient, private spinner: NgxSpinnerService) {
    this.evento = new Evento()
  }

  ngOnInit() {
    this.admin = sessionStorage.getItem("Role") === "ROLE_ADMIN"
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

}
