import { CreateSalePointConverter } from "converter/CreateSalePointConverter";
import { SalePointService } from "service/SalePointService";
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { CreateSalePointDtoRq, CreateSalePointDtoRs } from '../dto/CreateSalePointDto';
import { GetAllSalePointDtoRs } from '../dto/GetAllSalePointDto';
import { GetAllSalePointConverter } from '../converter/GetAllSalePointConverter';
import { GetSalePointConverter } from "converter/GetSalePointConverter";
import { SalePointAllModelRs } from '../model/SalePointModel';

@Tags('Sale Points')
@Route('sale-point')
export class SalePointsCrontrollers extends Controller {

    @Post('')
    @SuccessResponse(201, 'Created')
    public async create(
        @Body() bodyRq: CreateSalePointDtoRq,
    ): Promise<CreateSalePointDtoRs> {
        const id: string = await SalePointService.CreateSalePoint(CreateSalePointConverter.toModel(bodyRq));
        return { id: id }
    }

    /**
     * 
     * @returns GetAllSalePointDtoRs {@link GetAllSalePointDtoRs}
     */
    @Get('')
    @SuccessResponse(200, 'Success')
    public async getAll(): Promise<GetAllSalePointDtoRs[]> {
        let lstSalePoints: GetAllSalePointDtoRs[] = GetAllSalePointConverter.toDtoArray(await SalePointService.GetAll());
        return lstSalePoints;
    }

    /**
     * getSalePoint
     */
    @Get('{idSalePoint}')
    @SuccessResponse(200, 'Success')
    public async getSalePoint(
        @Path() idSalePoint: string
    ): Promise<GetAllSalePointDtoRs> {
        let salePoint: GetAllSalePointDtoRs = GetSalePointConverter.toDto(await SalePointService.GetSalePoint(idSalePoint));
        return salePoint;
    }

    /**
     * GetSalePointWithProduct
     */
    @Get('config/product')
    public async GetAllSalePointWithProduct(
        @Query() lat?: string,
        @Query() lng?: string,
        @Query() ratio?: string
    ): Promise<any> {
        let SalePointWithProduct = await SalePointService.GetAllSalePointWithProduct();
        if (lat !== undefined && lng !== undefined && ratio !== undefined) {
            let updateLstSalePoint: SalePointAllModelRs[] = [];
            SalePointWithProduct.map((item, i) => {
                if (this.CalculateRatio(parseInt(ratio), item, parseFloat(lat), parseFloat(lng))) {
                    updateLstSalePoint.push(item);
                }
            })

            if (updateLstSalePoint.length>0) {
                return GetSalePointConverter.toDtoWithProductArray(updateLstSalePoint);
            }else {
                return GetSalePointConverter.toDtoWithProductArray(SalePointWithProduct);
            }

        }else{
            return GetSalePointConverter.toDtoWithProductArray(SalePointWithProduct);
        }

    }

    private CalculateRatio(ratio: number, salePoint: SalePointAllModelRs, lat: number, lng: number): boolean {
        let [lat2S, lng2S] = salePoint.ubication.split(',');
        let lat2 = parseFloat(lat2S);
        let lng2 = parseFloat(lng2S);
        let radiusEarth: number = 6371e3;
        let theta1 = lat * Math.PI / 180;
        let theta2 = lat2 * Math.PI / 180;
        let alphaTheta = (lat2 - lat) * Math.PI / 180;
        let alphaLambda = (lng2 - lng) * Math.PI / 180;

        let a = Math.sin(alphaTheta / 2) * Math.sin(alphaTheta / 2) +
            Math.cos(theta1) * Math.cos(theta2) *
            Math.sin(alphaLambda / 2) * Math.sin(alphaLambda / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let d = radiusEarth * c; //meters
        let k = parseInt(d.toFixed(0)) / 1000; //kilometers

        if (k <= ratio) {
            return true;
        }
        return false
    }
}