import express, { Application } from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import PdfParseController from './controllers/PdfParserController'
import TokenValidationMiddleware from './middlewares/TokenValidationMiddleware'
import MainController from './controllers/MainController'

// Settings
const app: Application = express()

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

// Body Parsing Middleware
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())
app.use(Sentry.Handlers.errorHandler())
app.use(express.json({ limit: '10mb' }))
app.use(
  express.urlencoded({
    limit: '10mb',
    extended: true,
  })
)

// Open apps
// app.get('/', MainController.index);
app.get('/token', MainController.getToken)

app.use(TokenValidationMiddleware.validation)

// Protected apps
app.post('/parse-url', PdfParseController.parseUrl)
app.post('/parse-html', PdfParseController.parseHtml)

app.use(Sentry.Handlers.errorHandler())

export default app
