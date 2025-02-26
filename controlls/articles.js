import { ArticlesModel } from '../models/file-system/articles.js'
import { validateData } from '../schemas/validations.js'

export class ArticlesController {
  static async getAll (req, res) {
    const posts = await ArticlesModel.getPosts()
    res.render('home', { posts })
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      const currentPost = await ArticlesModel.getPostById({ id: Number(id) })
      res.render('Post', { post: currentPost })
    } catch (e) {
      res.status(404).json({ error: e.message })
    }
  }

  static async getAllAdmin (req, res) {
    const posts = await ArticlesModel.getPosts()
    res.render('Admin-view', { posts })
  }

  static async getViewNew (req, res) { res.render('new-blog-view') }

  static async getEditPostView (req, res) {
    const { id } = req.params
    const currentPost = await ArticlesModel.getPostById({ id: Number(id) })
    res.render('edit-blog', { post: currentPost })
  }

  static async createPost (req, res) {
    const { title, date, content } = req.body

    const newPost = {
      title,
      date: new Date(date),
      content: content?.split('\r\n')?.filter(data => data)
    }

    const dataParsed = validateData(newPost)

    if (dataParsed.error) {
      return res.json(dataParsed.error)
    }

    ArticlesModel.createPost({ newPost: dataParsed.data })

    res.render('Post', { post: dataParsed.data })
  }

  static async editPost (req, res) {
    const { id } = req.params
    const { title, date, content } = req.body

    const newPost = {
      title,
      date: new Date(date),
      content: content?.split('\r\n')?.filter(data => data)
    }

    const validatedData = validateData(newPost)

    if (validatedData.error) {
      return res.json({ error: validatedData.error })
    }

    try {
      await ArticlesModel.editPost({ id: Number(id), newPost: validatedData.data })
      res.render('post', { post: validatedData.data })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  static async deletePost (req, res) {
    const { id } = req.params

    try {
      await ArticlesModel.deletePost({ id: Number(id) })
      res.status(200).json({ message: 'Post deleted' })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }
}
