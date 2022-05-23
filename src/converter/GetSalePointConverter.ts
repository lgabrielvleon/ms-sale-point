import { GetAllSalePointDtoRs } from '../dto/GetAllSalePointDto';
import { RegisterSalePointModel } from '../model/RegisterSalePointModel';
export class GetSalePointConverter {
    
    static toDto(val: RegisterSalePointModel): GetAllSalePointDtoRs{
        return {
            id: val.idSalePoint,
            name: val.name,
            brandPhoto: val.brand,
            address: val.address,
            descPhoto: val.photoDesc,
            ubication: val.ubication,
            product: {
                name: val.nameProduct,
                description: val.descriptionProduct
            }
        }
    }
}