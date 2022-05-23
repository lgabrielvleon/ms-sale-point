import { RegisterSalePointModel } from 'model/RegisterSalePointModel';
import { CreateSalePointDtoRq } from '../dto/CreateSalePointDto';
export class CreateSalePointConverter {
    static toModel(val: CreateSalePointDtoRq):RegisterSalePointModel{
        return {
            idSalePoint: '',
            brand: val.brandPhoto,
            name: val.name,
            photoDesc: val.descPhoto+'',
            address: (val.address===undefined)?'':val.address,
            descriptionProduct: val.product?.description,
            nameProduct: val.product?.name,
            ubication: (val.ubication!=undefined)?val.ubication:''
        }
    }
}