import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const REGION: string = process.env.REGION;

export const ddbClient = new DynamoDBClient({ region: REGION });