import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MappaComponent } from './mappa/mappa.component';
import { PrenotazioneVisitaComponent } from './prenotazione-visita/prenotazione-visita.component';
import { RegistrazionePageComponent } from './registrazione-page/registrazione-page.component';
import { SceltaUtenteComponent } from './scelta-utente/scelta-utente.component';
import { TariffaComponent } from './tariffa/tariffa.component';
import { ContattiComponent } from './contatti/contatti.component';
import { UtentiRegistratiComponent } from './utenti-registrati/utenti-registrati.component';
import { InfoVisitatoreComponent } from './info-visitatore/info-visitatore.component';
import { EventoComponent } from './evento/evento.component';
import { BachecaEventiComponent } from './bacheca-eventi/bacheca-eventi.component';
import { SocioComponent } from './socio/socio.component';
import { VediModuliSocioComponent } from './vedi-moduli-socio/vedi-moduli-socio.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import{ PrenotazioneCampoComponent } from './prenotazione-campo/prenotazione-campo.component'; 
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mappa', component: MappaComponent },
  { path: 'chi-siamo', component: ChiSiamoComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registrazione', component: RegistrazionePageComponent },
  { path: 'prenotazione-visita', component: PrenotazioneVisitaComponent },
  { path: 'prenotazione-campo', component: PrenotazioneCampoComponent },
  { path: 'scelta-utente', component: SceltaUtenteComponent },
  { path: 'area-riservata', component: AreaRiservataComponent },
  { path: 'tariffa', component: TariffaComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'utenti-registrati', component: UtentiRegistratiComponent },
  { path: 'info-visitatore', component: InfoVisitatoreComponent },
  { path: 'evento', component: EventoComponent},
  { path: 'bacheca-eventi', component: BachecaEventiComponent},
  { path: 'socio', component: SocioComponent},
  { path: 'vedi-moduli-socio', component: VediModuliSocioComponent},
  { path: 'data-privacy', component: DataPrivacyComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'forgot-password/token/:tokenid', component: ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
