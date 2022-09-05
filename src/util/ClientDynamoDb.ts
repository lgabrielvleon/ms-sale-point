import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { REGION } from './Configure';

const region: string = REGION;

export const ddbClient = new DynamoDBClient({ region: region });