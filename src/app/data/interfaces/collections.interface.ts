export interface ICollections {
    error: boolean
    data: ICollection[]
}


export interface ICollection {
    id: string
    name: string
    category: string
    cover: string
    movies_count: number
    slug: string
}