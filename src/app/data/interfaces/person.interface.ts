import { IMFilms } from "./main.interface"

export interface IPerson {
    code: number
    error: boolean
    data: {
            info: {
                id: {
                    film: number
                    kp: string
                    photo: string
                }
                names: {
                    name: string
                    en: string
                }
                date: {
                    age: number
                }
            }
            films: {
                profession:string
                data:IMFilms[]
            }[]
            best_films: IMFilms[]
    }
}