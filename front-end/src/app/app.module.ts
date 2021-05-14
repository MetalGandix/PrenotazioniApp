import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MappaComponent } from './mappa/mappa.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrazionePageComponent } from './registrazione-page/registrazione-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { PrenotazioneVisitaComponent } from './prenotazione-visita/prenotazione-visita.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { SceltaUtenteComponent } from './scelta-utente/scelta-utente.component';
import { TariffaComponent } from './tariffa/tariffa.component';
import { RoleGuardComponent } from './service/jwt-auth/role-guard/role-guard.component';
import { AuthGuardComponent } from './service/jwt-auth/auth-guard/auth-guard.component';
import { AuthenticationService } from './service/authentication.service';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
import { ContattiComponent } from './contatti/contatti.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PlyrModule } from 'ngx-plyr';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { UtentiRegistratiComponent } from './utenti-registrati/utenti-registrati.component';
import { InfoVisitatoreComponent } from './info-visitatore/info-visitatore.component';
import { EventoComponent } from './evento/evento.component';
import { BachecaEventiComponent } from './bacheca-eventi/bacheca-eventi.component';
import { SocioComponent } from './socio/socio.component';
import { VediModuliSocioComponent } from './vedi-moduli-socio/vedi-moduli-socio.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PrenotazioneCampoComponent } from './prenotazione-campo/prenotazione-campo.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MappaComponent,
    ChiSiamoComponent,
    LoginPageComponent,
    RegistrazionePageComponent,
    PrenotazioneVisitaComponent,
    AreaRiservataComponent,
    SceltaUtenteComponent,
    TariffaComponent,
    AuthGuardComponent,
    ContattiComponent,
    SidenavComponent,
    FooterComponent,
    UtentiRegistratiComponent,
    InfoVisitatoreComponent,
    EventoComponent,
    BachecaEventiComponent,
    SocioComponent,
    VediModuliSocioComponent,
    DataPrivacyComponent,
    PrenotazioneCampoComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    HttpClientModule, 
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    PlyrModule,
    MatCardModule,
    MatListModule,
    YouTubePlayerModule,
    NgxSpinnerModule,
  ],
  providers: [AuthGuardComponent,RoleGuardComponent,AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
