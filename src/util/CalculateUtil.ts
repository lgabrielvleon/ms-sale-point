import { SalePointModel } from "repository/model/SalePointModel";

export class CalculateUtil {

    /**
     * CalculateDistance
     * 
     * @param salePoint 
     * @param lat 
     * @param lng 
     * @returns 
     */
    public static CalculateDistance(salePoint: SalePointModel, lat: number, lng: number): number {
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
     
        return k;
    }
}

