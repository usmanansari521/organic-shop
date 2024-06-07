
export interface Product {
    key: string,
    title: string,
    price: number,
    category?: {
        name: string
    },
    imageUrl: string
}