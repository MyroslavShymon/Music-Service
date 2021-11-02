export interface IRole {
    id: number,
    title: string,
    description: string
}

export interface IUser {
    id?: number
    name?: string,
    email?: string,
    password?: string
    roles?: IRole[]
}