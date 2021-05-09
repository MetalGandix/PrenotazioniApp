import { Role } from "./role"

export class User {
    username: string
    password: string
    name: string
    lastname: string
    cellulare:string
    privacy_accett: boolean
    is_socio: boolean
    checkbox3: boolean
    enabled: boolean
    roles: Role
}
