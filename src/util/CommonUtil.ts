export class CommonUtil {

    /**
     * getLengthUnitDesc
     * 
     * @param distance 
     * @returns 
     */
    public static getLengthUnitDesc(distance: number): string{
        let distanceLenghtUnitDesc: string;
        if (distance<1) {
            distanceLenghtUnitDesc = distance*1000+' m';
        }else{
            distanceLenghtUnitDesc = distance+' km';
        }
        return distanceLenghtUnitDesc;
    }
}