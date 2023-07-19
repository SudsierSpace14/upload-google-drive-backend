require('dotenv').config()
const Mongoose = require('mongoose')

const deleteFile = require('../services/deleteFile')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const PostSchema = Mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    fileId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

PostSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

PostSchema.pre('remove', async function(){
    if(this.url){
        await deleteFile(this.fileId)
    }
    return await promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
})

module.exports = Mongoose.model('Post', PostSchema)