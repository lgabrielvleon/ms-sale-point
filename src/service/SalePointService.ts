import { RegisterSalePointModel } from "model/RegisterSalePointModel";
import { ddbClient } from 'util/ClientDynamoDb';
import { ScanCommand, PutItemCommand, PutItemCommandInput, ScanCommandOutput, GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { v4 as uuid } from 'uuid';
import { ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { dayOfWeek } from "util/dto/UtilsDto";
import moment from "moment-timezone";
import { ClientAPI } from "../util/ClientAPI";
import { SalePointAllModelRs } from '../model/SalePointModel';
import { ConfigOrderModelRs } from "model/OrderConfigModel";
import { TABLE_NAME_SALE_POINT } from "util/Configure";

const tableName: string = TABLE_NAME_SALE_POINT;

/**
 * @author Lucas Vásquez
 */
export class SalePointService {

    /**
     * CreateSalePoint
     */
    public static async CreateSalePoint(salePointModel: RegisterSalePointModel): Promise<string> {

        try {
            salePointModel.idSalePoint = uuid();
            console.log(salePointModel.idSalePoint);

            let params: PutItemCommandInput = {
                TableName: tableName,
                Item: {
                    "idSalePoint": { "S": salePointModel.idSalePoint },
                    "name": { "S": salePointModel.name },
                    "ubication": { "S": salePointModel.ubication },
                    "address": { "S": salePointModel.address },
                    "brand": { "S": salePointModel.brand },
                    "photoDesc": { "S": salePointModel.photoDesc },
                    "nameProduct": { "S": salePointModel.nameProduct },
                    "descriptionProduct": { "S": salePointModel.descriptionProduct }
                }
            }

            await ddbClient.send(new PutItemCommand(params));

            console.log('Sucess - item added');
            return salePointModel.idSalePoint

        } catch (err) {
            console.error(err);
            throw new Error(err)
        }

    }

    /**
     * GetAll
     */
    public static async GetAll(): Promise<RegisterSalePointModel[]> {
        try {
            let params: ScanCommandInput = {
                TableName: tableName,
                Select: "ALL_ATTRIBUTES"
            }

            let result: ScanCommandOutput = await ddbClient.send(new ScanCommand(params))

            let lstSalePoints: RegisterSalePointModel[] = [];

            result.Items.map((value) => {
                lstSalePoints.push({
                    idSalePoint: value.idSalePoint.S,
                    name: value.name.S,
                    address: value.address.S,
                    brand: value.brand.S,
                    photoDesc: value.photoDesc.S,
                    ubication: value.ubication.S,
                    descriptionProduct: value.descriptionProduct.S,
                    nameProduct: value.nameProduct.S,
                });
            })

            return lstSalePoints;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    /**
     * GetSalePoint
     * Método para consultar el detalle de un punto de venta
     * @param idSalePoint Id del punto de venta
     * @see {@link RegisterSalePointModel}
     * @author Lucas Vásquez
     */
    public static async GetSalePoint(idSalePoint: string): Promise<RegisterSalePointModel> {
        try {
            let params: GetItemCommandInput = {
                TableName: tableName,
                Key: {
                    idSalePoint: {
                        S: idSalePoint
                    }
                },
                AttributesToGet: [
                    "idSalePoint",
                    "name",
                    "address",
                    "brand",
                    "photoDesc",
                    "ubication",
                    "descriptionProduct",
                    "nameProduct"
                ]
            }

            let result: GetItemCommandOutput = await ddbClient.send(new GetItemCommand(params))

            let objSalePointModel: RegisterSalePointModel = {
                idSalePoint: result.Item.idSalePoint.S,
                name: result.Item.name.S,
                address: result.Item.address.S,
                brand: result.Item.brand.S,
                photoDesc: result.Item.photoDesc.S,
                ubication: result.Item.ubication.S,
                descriptionProduct: result.Item.descriptionProduct.S,
                nameProduct: result.Item.nameProduct.S
            }

            return objSalePointModel;
        } catch (error) {
            console.error(error);
            throw new Error(error);

        }
    }

    /**
     * GetAllSalePointWithProduct
     */
    public static async GetAllSalePointWithProduct(): Promise<SalePointAllModelRs[]> {
        let url_base_api = 'https://le3badnlvc.execute-api.us-east-1.amazonaws.com/dev/api/order/config/';

        try {

            let params: ScanCommandInput = {
                TableName: tableName,
                Select: "ALL_ATTRIBUTES"
            }

            let result: ScanCommandOutput = await ddbClient.send(new ScanCommand(params))

            let date = new Date();
            let now = moment(date.getTime()).tz("America/Lima");
            let day = moment(now).day();

            let lstSalePoints: SalePointAllModelRs[] = [];
            
            await Promise.all(result.Items.map(
                async (element) => {
                    let url_api = url_base_api + element.idSalePoint.S + '/day/' + dayOfWeek[day];
                    let res: APIGenericResponse<ConfigOrderModelRs> = await ClientAPI.getInstance().fetchAPI<ConfigOrderModelRs>('get', url_api);
                    if (res.ok) {
                        lstSalePoints.push({
                            idSalePoint: element.idSalePoint.S,
                            name: element.name.S,
                            address: element.address.S,
                            brand: element.brand.S,
                            photoDesc: element.photoDesc.S,
                            ubication: element.ubication.S,
                            descriptionProduct: element.descriptionProduct.S,
                            nameProduct: element.nameProduct.S,
                            configOrder: res.body
                        });
                    }
            }));

            return lstSalePoints;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }

    }
}