import moment from "moment-timezone";
import { ConfigProductRepository } from "repository/client/ConfigProductRepository";
import { dayOfWeek } from "util/dto/UtilsDto";
import { SalePointRespoitory } from '../repository/client/SalePointRepository';
import { SalePointModel } from '../repository/model/SalePointModel';
import { ConfigOrderModelRs } from '../model/OrderConfigModel';
import { SalePointConfigModelResponse } from "repository/model/SalePointConfigModel";
import { SalePointConfigProductConverter } from '../converter/SalePointConfigProductConverter';
import { CalculateUtil } from "util/CalculateUtil";
import { CommonUtil } from "util/CommonUtil";
import { GetSalePointConfigProductDtoResponse } from "dto/GetSalePointConfigProductDto";

export class SalePointConfigProductService {
    //#region SINGLETON
    private static instance: SalePointConfigProductService;
    private constructor() { }
    public static getInstance(): SalePointConfigProductService {
        if (!SalePointConfigProductService.instance) {
            SalePointConfigProductService.instance = new SalePointConfigProductService();
        }
        return SalePointConfigProductService.instance;
    }
    //#endregion

    /**
     * getSalePointsConfigProduct
     * 
     * @param lat 
     * @param lng 
     * @param ratio 
     * @returns 
     */
    public async getSalePointsConfigProduct(
        lat?: string,
        lng?: string,
        ratio?: string
    ): Promise<GetSalePointConfigProductDtoResponse[]> {
        try {
            let responseSalePoints: SalePointModel[] = await SalePointRespoitory.getInstance().retriveAll();
            let availableSalePoints: SalePointModel[] = [];
            if (lat !== undefined && lng !== undefined && ratio !== undefined) {
                responseSalePoints.map((item, i) => {
                    let distance: number = CalculateUtil.CalculateDistance(
                        item,
                        parseFloat(lat),
                        parseFloat(lng)
                    );
                    if (distance<=parseInt(ratio)){
                        item.distance=CommonUtil.getLengthUnitDesc(distance);
                        availableSalePoints.push(item);
                    }
                })
                if (availableSalePoints.length < 1) {
                    availableSalePoints = responseSalePoints;
                }
            } else {
                availableSalePoints = responseSalePoints;
            }

            let date = new Date();
            let now = moment(date.getTime()).tz("America/Lima");
            let day = moment(now).day();
            let descDay = dayOfWeek[day];

            let lstSalePointsModel: SalePointConfigModelResponse[] = [];

            await Promise.all(availableSalePoints.map(
                async (item) => {
                    let responseConfigProduct: APIGenericResponse<ConfigOrderModelRs> = await ConfigProductRepository.getInstance().retriveConfigProductDay(
                        item.idSalePoint,
                        descDay
                    );
                    if (responseConfigProduct.ok) {
                        lstSalePointsModel.push({
                            idSalePoint: item.idSalePoint,
                            name: item.name,
                            address: item.address,
                            brand: item.brand,
                            photoDesc: item.photoDesc,
                            ubication: item.ubication,
                            distance: item.distance,
                            descriptionProduct: item.descriptionProduct,
                            nameProduct: item.nameProduct,
                            configOrder: responseConfigProduct.body
                        })
                    }
                }
            ));

            return SalePointConfigProductConverter.toDtoArray(lstSalePointsModel);
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    
}