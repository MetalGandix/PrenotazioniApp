import { Campo } from "./campo"
import { User } from "./user"

export class PrenotazioneCampo {

    id: number
    data: Date
    orario: string
    Campo: Campo
    userPrenotazione: User

    infoAggiuntiva: string



}
