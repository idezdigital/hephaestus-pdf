import {Request, Response} from "express";
import 'dotenv/config'

export default class MainController
{
    static async index(request: Request, response: Response)
    {
        return response.json({})
    }

    static async getToken(request: Request, response: Response)
    {
        return response.json({
            'token': process.env.ACCESS_TOKEN
        })
    }
}
