import { GetSalePointWithProductDtoRs } from 'dto/GetSalePointDto';
import { GetAllSalePointDtoRs } from '../dto/GetAllSalePointDto';
import { RegisterSalePointModel } from '../model/RegisterSalePointModel';
import { SalePointAllModelRs } from '../model/SalePointModel';
export class GetSalePointConverter {

    static toDto(val: RegisterSalePointModel): GetAllSalePointDtoRs {
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

    static toDtoWithProductArray(SalePointWithProductModel: SalePointAllModelRs[]): GetSalePointWithProductDtoRs[] {
        let SalePointWithProductArray: GetSalePointWithProductDtoRs[] = [];

        SalePointWithProductModel.forEach((element) => {
            SalePointWithProductArray.push({
                id: element.idSalePoint,
                name: element.name,
                brandPhoto: element.brand,
                address: element.address,
                descPhoto: element.photoDesc,
                ubication: element.ubication,
                product: {
                    id: element.configOrder.idOrderConfig,
                    name: element.nameProduct,
                    description: element.descriptionProduct,
                    price: element.configOrder.price,
                    schedule: element.configOrder.schedule,
                    stock: element.configOrder.stock
                }
            });
        })

        return SalePointWithProductArray;
    }
}