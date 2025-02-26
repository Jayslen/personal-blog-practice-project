import { Router } from 'express'
import { authMiddleware } from '../middleware/authmiddleware.js'
import { ArticlesController } from '../controlls/articles.js'

export const viewsRoute = Router()

viewsRoute.get('/', ArticlesController.getAll)
viewsRoute.get('/article/:id', ArticlesController.getById)
viewsRoute.get('/admin', authMiddleware, ArticlesController.getAllAdmin)
viewsRoute.get('/new', authMiddleware, ArticlesController.getViewNew)
viewsRoute.get('/edit/:id', authMiddleware, ArticlesController.getEditPostView)
