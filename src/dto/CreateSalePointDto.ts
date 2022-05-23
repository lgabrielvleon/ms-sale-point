export interface CreateSalePointDtoRq{
    name: string,
    ubication?: string,
    address?: string,
    brandPhoto: string,
    descPhoto?: string
    product?: {
        name: string,
        description?: string
    }
}

export interface CreateSalePointDtoRs{
    id: string
}