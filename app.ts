import express from 'express'
import cors from 'cors'
import companyRouter from './routes/company.js'
import { handleCustomError, handlePsqlError, handleSeverError } from './middleware/errorHandlers.js'
import usersRouter from './routes/users.js'
import jobRouter from './routes/job.js'
import skillsRouter from './routes/skills.js'
import applicationRouter from './routes/application.js'
import applicationUserRouter from './routes/applicationUser.js'
import applicationJobRouter from './routes/applicationJob.js'
import skillsUserRouter from './routes/skillsUser.js'
import skillsJobRouter from './routes/skillsJob.js'
import savedJobRouter from './routes/saved_job.js'
import { login } from './controllers/login.js'
import { serve, setup } from 'swagger-ui-express'
import * as swaggerJSDoc from 'swagger-jsdoc'
import * as swaggerUI from 'swagger-ui-express'

const app = express()

app.use(cors());
app.use(express.json())

const apiRouter = express.Router()

const options: swaggerJSDoc.OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jobseekers',
            description: 'An API with RESTful routes, authentication for the Jobseekers full-stack application.',
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:9090/' }
        ]
    },
    apis: ['./app.ts']
}

const spec = swaggerJSDoc.default(options)

app.use("/api", apiRouter)

apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));

apiRouter.use("/login", login)
apiRouter.use("/job", jobRouter)
apiRouter.use("/skills", skillsRouter)
apiRouter.use("/application", applicationRouter)
apiRouter.use("/user", usersRouter)
apiRouter.use("/company", companyRouter)
apiRouter.use("/user/application_user", applicationUserRouter)
apiRouter.use("/job/application_job", applicationJobRouter)
apiRouter.use("/user/skills_user", skillsUserRouter)
apiRouter.use("/job/skills_job", skillsJobRouter)
apiRouter.use("/user/saved_job", savedJobRouter)

app.use(handlePsqlError);
app.use(handleCustomError);
app.use(handleSeverError);

export default app