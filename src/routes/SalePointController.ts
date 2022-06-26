import { CreateSalePointConverter } from "converter/CreateSalePointConverter";
import { SalePointService } from "service/SalePointService";
import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { CreateSalePointDtoRq, CreateSalePointDtoRs } from '../dto/CreateSalePointDto';
import { GetAllSalePointDtoRs } from '../dto/GetAllSalePointDto';
import { GetAllSalePointConverter } from '../converter/GetAllSalePointConverter';
import { GetSalePointConverter } from "converter/GetSalePointConverter";

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
    public async GetAllSalePointWithProduct(): Promise<any> {
        let SalePointWithProduct = await SalePointService.GetAllSalePointWithProduct();
        return GetSalePointConverter.toDtoWithProductArray(SalePointWithProduct);
    }
}