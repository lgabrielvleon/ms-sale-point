import {ErrorDto} from './util/dto/ErrorDto';
import express,{
    Request as ExRequest,
    Response as ExResponse,
    NextFunction
} from "express";
import cors from 'cors';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from './generated/routes';

const serverlessExpress = require("@vendia/serverless-express");
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(cors());

RegisterRoutes(app);

app.use((
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void => {
    if (err instanceof ValidateError) {
        console.error(`Caught Validation Error for ${req.path}:`, err.fields);
        var errBody: ErrorDto = {
            statusCode: 400,
            message: 'Bad Request',
            detailMessage: err.name
        }
        return res.status(errBody.statusCode).json(errBody)
    }

    if (err instanceof Error) {
        console.error(`Caught Error for ${req.path}:`, err.message)
        var errBody: ErrorDto = {
            statusCode: 500,
            message: 'Internal Server Error',
            detailMessage: err.message,
        }

        return res.status(errBody.statusCode).json(errBody)

    }

    next()
})

console.log(app);
export const handler = serverlessExpress({app});