export interface GetSalePointConfigProductDtoResponse {
    id: string,
    name: string,
    localization?: localization,
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

type localization = {
    latLng: string,
    distance: string,
}