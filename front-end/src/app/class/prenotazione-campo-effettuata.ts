import { Campo } from "./campo"
import { User } from "./user"

export class PrenotazioneCampoEffettuata {



    id: number
    data: Date
    orario: string
    campo: Campo
    utentePrenotazione: User

    infoAggiuntiva: string




}
