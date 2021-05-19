import { Campo } from "./campo"
import { User } from "./user"

export class PrenotazioneCampo {
    
    id: number
    data: Date
    orario: string
    campo: Campo
    userPrenotazione: User  
    prenotato:boolean
    infoAggiuntiva: string
}
