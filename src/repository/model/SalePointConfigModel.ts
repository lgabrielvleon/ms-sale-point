import { ConfigOrderModelRs } from '../../model/OrderConfigModel';
export interface SalePointConfigModelResponse{
    idSalePoint: string,
    name: string,
    ubication: string,
    distance?: string,
    address: string,
    brand: string,
    photoDesc: string,
    nameProduct?: string,
    descriptionProduct?: string,
    configOrder: ConfigOrderModelRs
}