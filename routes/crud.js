import { Router } from 'express'
import { authMiddleware } from '../middleware/authmiddleware.js'
import { ArticlesController } from '../controlls/articles.js'

export const crudRouter = Router()

crudRouter.post('/new', authMiddleware, ArticlesController.createPost)
crudRouter.patch('/edit/:id', authMiddleware, ArticlesController.editPost)
crudRouter.delete('/delete/:id', authMiddleware, ArticlesController.deletePost)
