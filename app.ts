import express from 'express'
import companyRouter from './routes/company.js'

const app = express()

app.use(express.json())

const apiRouter = express.Router()

app.use("/api", apiRouter)
apiRouter.use("/company", companyRouter)

export default app