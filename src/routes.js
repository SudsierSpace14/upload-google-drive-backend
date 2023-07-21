const { Router } = require('express');
const routes = Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const upload = require('./services/uploadFile')

const Post = require('./models/Post')

routes.post('/posts', multer(multerConfig).single("file"), async (req, res) => {
    
    const {originalname, size, filename, path, stream} = req.file
    
    const file = await upload(filename, stream)

    const post = await Post.create({
        name: originalname,
        size: size,
        key: filename,
        url: file.webContentLink && file.webContentLink.replace('export=download', ''),
        fileId: file.id,
    })
    return res.json({post, webViewLink: file.webViewLink})
})

routes.get('/posts', async (req, res) => {
    const posts = await Post.find()

    res.json(posts)
})

routes.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)

    await post.remove()

    return res.json('file deleted')
})

routes.delete('/delete/all', async (req, res) => {
    await Post.deleteMany()
    
    res.json({message: 'everything deleted'})
})

module.exports = routes