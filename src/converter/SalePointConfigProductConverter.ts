import { GetSalePointConfigProductDtoResponse } from 'dto/GetSalePointConfigProductDto';
import { SalePointConfigModelResponse } from 'repository/model/SalePointConfigModel';

export class SalePointConfigProductConverter {

    static toDtoArray(SalePointWithProductModel: SalePointConfigModelResponse[]): GetSalePointConfigProductDtoResponse[] {
        let SalePointWithProductArray: GetSalePointConfigProductDtoResponse[] = [];

        SalePointWithProductModel.forEach((element) => {
            SalePointWithProductArray.push({
                id: element.idSalePoint,
                name: element.name,
                brandPhoto: element.brand,
                address: element.address,
                descPhoto: element.photoDesc,
                localization: {
                    latLng: element.ubication,
                    distance: element.distance
                },
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