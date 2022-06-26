import { ConfigOrderModelRs } from "./OrderConfigModel";

export interface SalePointAllModelRs{
    idSalePoint: string,
    name: string,
    ubication: string,
    address: string,
    brand: string,
    photoDesc: string,
    nameProduct?: string,
    descriptionProduct?: string,
    configOrder: ConfigOrderModelRs
}