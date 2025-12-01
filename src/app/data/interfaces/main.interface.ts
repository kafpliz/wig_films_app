import { ICollections } from "./collections.interface"

export interface IMainChapter {
    popular: IMResponce
    inovations: IMResponce
    top: IMResponce
    collections:ICollections
}


export interface IMResponce {
    error: boolean
    data:  IMFilms[]
    page?:number
    pages?:number
}


export interface IMGenre {
    name: string
    slug: string
}

export interface IMRandom {
     error: boolean
    data: IMFilms 
}

export interface IMFilms {
    id: Number
    name: string | null
    alternative_name: string | null,
    rating: {
        kp: number
    },
    logo: string //на новинки и поиск постеры, на всё остальное backdrops
    categories?: {
        name: string
    }[] // на топ и поиск
    movie_length?: number // топ
    type?: string //поиск
    age_rating?: number //поиск
    profession?: string // person
}
