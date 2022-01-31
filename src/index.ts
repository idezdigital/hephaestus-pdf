import express, { Application, Request, Response } from "express";
import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import PdfParseController from "./controllers/PdfParserController";
import TokenValidationMiddleware from "./middlewares/TokenValidationMiddleware";
import MainController from "./controllers/MainController";

// Settings
const app: Application = express();
const port = process.env.PORT || "3000";
Sentry.init({
    dsn: "https://6b7ade0ab284417faa88f0832c8f4975@o1131845.ingest.sentry.io/6176768",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

// Body Parsing Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Open apps
app.get('/', MainController.index)
app.get('/token', MainController.getToken)

app.use(TokenValidationMiddleware.validation)

// Protected apps
app.post('/parse-url', PdfParseController.parseUrl)
app.post('/parse-html', PdfParseController.parseHtml)

app.use(Sentry.Handlers.errorHandler());

// Listen
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: unknown) {
    console.error(error);
}
