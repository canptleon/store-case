export interface IProduct {
    avatar: string
    category: string
    createdAt: number
    description: string
    developerEmail: string
    id: string
    name: string
    price: string,
    isVisible?: boolean
}

export type AddProductNested = {
    name?: string
    price?: number
    category?: string
    description?: string
    avatar?: string
    developerEmail?: string
}

export interface ICategories{
    createdAt: string
    id: string
    name: string
}
