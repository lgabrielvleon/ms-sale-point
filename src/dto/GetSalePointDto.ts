export interface GetSalePointWithProductDtoRs {
    id: string,
    name: string,
    ubication?: string,
    address?: string,
    brandPhoto: string,
    descPhoto?: string
    product?: product
}

type product = {
    id: string,
    name: string,
    description?: string,
    price: {
        originalAmount: number,
        amount: number
    },
    schedule: string,
    stock: number
}