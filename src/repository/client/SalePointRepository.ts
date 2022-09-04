import { ScanCommand, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import { SalePointModel } from "repository/model/SalePointModel";
import { ddbClient } from "util/ClientDynamoDb";
import { TABLE_NAME_SALE_POINT } from "util/Configure";

export class SalePointRespoitory {
    //#region Singleton
    private static instance: SalePointRespoitory;
    private constructor(){}
    public static getInstance(): SalePointRespoitory {
        if (!SalePointRespoitory.instance) {
            SalePointRespoitory.instance = new SalePointRespoitory();
        }
        return SalePointRespoitory.instance;
    }
    //#endregion

    /**
     * retriveAll
     */
    public async retriveAll(): Promise<SalePointModel[]> {
        try {
            let params: ScanCommandInput = {
                TableName: TABLE_NAME_SALE_POINT,
                Select: "ALL_ATTRIBUTES"
            }
            let result: ScanCommandOutput = await ddbClient.send(new ScanCommand(params));

            let lstSalePoints: SalePointModel[] = [];
            result.Items.map((item, i) => {
                lstSalePoints.push({
                    idSalePoint: item.idSalePoint.S,
                    name: item.name.S,
                    address: item.address.S,
                    brand: item.brand.S,
                    photoDesc: item.photoDesc.S,
                    ubication: item.ubication.S,
                    descriptionProduct: item.descriptionProduct.S,
                    nameProduct: item.nameProduct.S,
                })
            });
            return lstSalePoints;
            
        } catch (error) {
            
        }
    }
}