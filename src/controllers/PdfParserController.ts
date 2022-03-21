import {Request, Response} from "express";
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";

import debugIsActive from "../utils/debug-is-active";

export default class PdfParseController {

    static async parseUrl(request: Request, response: Response)
    {
        try {
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    "--single-process",
                    "--no-zygote"
                ],
            });
            const page = await browser.newPage();

            if (debugIsActive()) {
                page.on("console", (message) =>
                    console.log(`${message.type().slice(0, 3).toUpperCase()}: ${message.text()}`)
                )
                    .on("pageerror", ({ message }) => console.log(message))
                    .on("response", (response) => console.log(`${response.status()}: ${response.url()}`))
                    .on("requestfailed", (request) => console.log(`${request.failure().errorText} ${request.url()}`));
            }

            await page.goto(request.body.url);

            const pdf = await page.pdf({
                format: "a4",
                printBackground: true
            });

            await browser.close();

            return response.send(pdf);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    static async parseHtml(request: Request, response: Response)
    {
        try {
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    "--single-process",
                    "--no-zygote"
                ],
            });
            
            const page = await browser.newPage();
       
            if (debugIsActive()) {
                page.on("console", (message) =>
                    console.log(`${message.type().slice(0, 3).toUpperCase()}: ${message.text()}`)
                )
                    .on("pageerror", ({ message }) => console.log(message))
                    .on("response", (response) => console.log(`${response.status()}: ${response.url()}`))
                    .on("requestfailed", (request) => console.log(`${request.failure().errorText} ${request.url()}`));
            }

            await page.setContent(request.body.html)

            const pdf = await page.pdf({
                format: "a4",
                printBackground: true
            });

            await browser.close();

            return response.send(pdf);
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
