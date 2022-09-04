import { ConfigOrderModelRs } from "model/OrderConfigModel";
import { ClientAPI } from "util/ClientAPI";
import { ORDER_BASE_URI } from 'util/Configure';
import { CONFIG_PRODUCT_DAY_ENDPOINT } from "util/Constants";

export class ConfigProductRepository {
    //#region SINGLETON
    private static instance: ConfigProductRepository;
    private constructor(){}
    public static getInstance(): ConfigProductRepository {
        if (!ConfigProductRepository.instance) {
            ConfigProductRepository.instance = new ConfigProductRepository();
        }
        return ConfigProductRepository.instance;
    }
    //#endregion

    /**
     * retriveConfigProductDat
     * 
     * @param idSalePoint 
     * @param dayOfWeek 
     * @returns 
     */
    public async retriveConfigProductDay(
        idSalePoint: string,
        dayOfWeek: string
    ): Promise<APIGenericResponse<ConfigOrderModelRs>> {
        try {
            let URL = ORDER_BASE_URI+CONFIG_PRODUCT_DAY_ENDPOINT;
            URL = URL.replace(':idSalePoint', idSalePoint);
            URL = URL.replace(':dayOfWeek', dayOfWeek);

            let response: APIGenericResponse<ConfigOrderModelRs> = await ClientAPI.getInstance().fetchAPI(
                'get',
                URL
            );

            return response;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}