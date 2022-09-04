import { GetSalePointConfigProductDtoResponse } from "../dto/GetSalePointConfigProductDto";
import { Controller, Get, Query, Route, SuccessResponse, Tags } from "tsoa";
import { SalePointConfigProductService } from '../service/SalePointConfigProductService';

@Tags('Sale Points')
@Route('sale-point/2')
export class SalePointV2Controller extends Controller {
    
    /**
     * GetSalePointsConfigProductDay
     */
    @Get('config/product')
    @SuccessResponse(200, 'Success')
    public async GetSalePointsConfigProduct(
        @Query() lat?: string,
        @Query() lng?: string,
        @Query() ratio?: string
    ): Promise<GetSalePointConfigProductDtoResponse[]> {
        let response = await SalePointConfigProductService.getInstance().getSalePointsConfigProduct(
            lat,
            lng,
            ratio
        );
        return response; 
    }
}