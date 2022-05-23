import { RegisterSalePointModel } from '../model/RegisterSalePointModel';
import { GetAllSalePointDtoRs } from '../dto/GetAllSalePointDto';
export class GetAllSalePointConverter {
    static toDtoArray(valArray: RegisterSalePointModel[]): GetAllSalePointDtoRs[]{

        let lstSalePointsDto: GetAllSalePointDtoRs[] = [];
        valArray.map((val) => {
            lstSalePointsDto.push({
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
            });
        })

        return lstSalePointsDto;
    }
}