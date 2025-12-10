import express from 'express'
import companyRouter from './routes/company.js'
import { handleCustomError, handlePsqlError, handleSeverError } from './middleware/errorHandlers.js'
import usersRouter from './routes/users.js'
import jobRouter from './routes/job.js'
import skillsRouter from './routes/skills.js'
import applicationRouter from './routes/application.js'
import applicationUserRouter from './routes/applicationUser.js'

const app = express()

app.use(express.json())

const apiRouter = express.Router()

app.use("/api", apiRouter)
apiRouter.use("/company", companyRouter)
apiRouter.use("/user", usersRouter)
apiRouter.use("/job", jobRouter)
apiRouter.use("/skills", skillsRouter)
apiRouter.use("/application", applicationRouter)
apiRouter.use("/user/application_user", applicationUserRouter)

app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleSeverError);

export default app