import express, { Application, Request, Response } from "express";
import PdfParseController from "./controllers/PdfParserController";
import TokenValidationMiddleware from "./middlewares/TokenValidationMiddleware";
import MainController from "./controllers/MainController";

// Settings
const route: Application = express();
const port = 3000;

// Body Parsing Middleware
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Open Routes
route.get('/', MainController.index)
route.get('/token', MainController.getToken)

route.use(TokenValidationMiddleware.validation)

// Protected Routes
route.post('/parse-url', PdfParseController.parseUrl)
route.post('/parse-html', PdfParseController.parseHtml)

// Listen
try {
    route.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: unknown) {
    console.error(error);
}
