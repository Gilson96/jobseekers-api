import express from 'express'
import companyRouter from './routes/company.js'
import { handleCustomError, handlePsqlError, handleSeverError } from './middleware/errorHandlers.js'

const app = express()

app.use(express.json())

const apiRouter = express.Router()

app.use("/api", apiRouter)
apiRouter.use("/company", companyRouter)

app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleSeverError);

export default app