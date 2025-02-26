import express from 'express'
import { overrideMethod } from './middleware/changeMethodMiddleware.js'
import { viewsRoute } from './routes/views.js'
import { crudRouter } from './routes/crud.js'

const app = express()
const PORT = 3080

app.use(express.urlencoded({ extended: true }))
app.use(overrideMethod)

app.use(crudRouter)
app.use(viewsRoute)
app.set('view engine', 'ejs')

app.use((req, res) => {
  res.status(404).render('not-found')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
