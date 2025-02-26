import fs from 'node:fs/promises'
import path from 'node:path'

const postPath = path.join(process.cwd(), '/post.json')

export class ArticlesModel {
  // Private fiels
  static async #getFiles () {
    return JSON.parse(await fs.readFile(postPath, { encoding: 'utf-8' }))
  }

  // Methods
  static async getPosts () {
    const posts = await this.#getFiles()

    return posts.map((post) => {
      return {
        ...post,
        date: new Date(post.date).toDateString()
      }
    })
  }

  static async getPostById ({ id }) {
    const posts = await this.#getFiles()
    const postFetched = posts.find((post) => post.id === id)

    if (!postFetched) {
      throw new Error(`Post with id ${id} not found`)
    }

    return postFetched
  }

  static async createPost ({ newPost }) {
    const posts = await this.#getFiles()

    let id = posts.length === 0 ? 0 : Math.max(...posts.map(data => data.id)) ?? 0

    posts.push({ ...newPost, id: ++id })

    try {
      fs.writeFile(postPath, JSON.stringify(posts))
    } catch {
      console.log('An error has occured')
    }
  }

  static async editPost ({ id, newPost }) {
    const posts = await this.#getFiles()

    const postIndex = posts.findIndex(post => post.id === id)

    if (postIndex === -1) {
      throw new Error(`Post with id ${id} not found`)
    }

    posts[postIndex] = { ...posts[postIndex], ...newPost }
    try {
      await fs.writeFile(postPath, JSON.stringify(posts))
    } catch {
      console.log('An error has occurred')
    }
  }

  static async deletePost ({ id }) {
    const posts = await this.#getFiles()

    const postIndex = posts.findIndex(post => post.id === id)

    if (postIndex === -1) {
      throw new Error(`Post with id ${id} not found`)
    }

    posts.splice(postIndex, 1)
    try {
      await fs.writeFile(postPath, JSON.stringify(posts))
    } catch {
      console.log('An error has occurred')
    }
  }
}
