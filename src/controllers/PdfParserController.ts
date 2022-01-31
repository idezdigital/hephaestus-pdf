import {Request, Response} from "express";
import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";

export default class PdfParseController {

    static async parseUrl(request: Request, response: Response)
    {
        try {
            const browser = await puppeteer.launch({
                executablePath: 'google-chrome-stable',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            await page.goto(request.body.url);

            const pdf = await page.pdf({format: 'a4' });
            await browser.close();

            return response.send(pdf);
        } catch (error) {
            return response.status(502).json({
                "message": 'Failed to parse this view to PDF',
                "error": error
            });
        }
    }

    static async parseHtml(request: Request, response: Response)
    {
        try {
            const browser = await puppeteer.launch({
                executablePath: 'google-chrome-stable',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            await page.setContent(request.body.html)

            const pdf = await page.pdf({ format: "a4" });

            await browser.close();

            return response.send(pdf);
        } catch (error) {
            return response.status(502).json({
                "message": 'Failed to parse this HTML to PDF',
                "error": error
            });
        }
    }
}
