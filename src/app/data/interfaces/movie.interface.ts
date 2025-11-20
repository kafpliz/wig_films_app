export interface IMovie {

    code: number
    data: {
        categories: { name: string }[]
        countries: { name: string }[]
        film: {
            isSeries:boolean
            favorite: boolean
            nominations: string[]
            pictures: {
                poster: {
                    big: string
                    small: string
                },
                backdrop: string
                logo: string
            }
            age_rating: {
                age: string
                mpaa: string
            }
            description: {
                long: string
                short: string
            }
            id: {
                film: number
                imdb_id: string
                kp: number
            }
            movie_length: number
            names: {
                name: string
                alternative: string
            }
            rating: {
                film_critics: number
                imdb: number
                kp: number
            }
            top: {
                top10: number | null
                top250: number | null
            }
            type: string
            year: number
            url: string
        }
        persons: {
            id: number
            name: string
            photo: string
            profession: string
        }[]
        seasons: IMSeasons[]


    }
    error: boolean

}

export interface IMSeasons {
    movieId: number,
    number: number,
    airDate: string
    createdAt?: string
    description: string
    duration: number
    enDescription: string
    enName: string
    name: string
    poster: {
        url: string
        previewUrl: string
    },
    updatedAt: string
    episodesCount: number
    id: string
    episodes: {
        number: number
        name: string
        enName: string
        airDate: string
        description: string
        enDescription: string
        still?: {
            url?: string
            previewUrl?: string
        }
    }[]
}

export interface ISeasons {
    name:string |null
    altName:string  |null
    seasons:IMSeasons[]
}