export interface GetAllSalePointDtoRs{
    id: String,
    name: String,
    ubication?: String,
    address?: string,
    brandPhoto: String,
    descPhoto?: String
    product?: {
        name: String,
        description?: String
    }
}