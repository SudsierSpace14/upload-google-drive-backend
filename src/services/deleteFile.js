const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const drive = require('./app')

async function deleteFile(id){
    try{
        await drive.files.delete({
            fileId: id
        })
    }catch(err){
        console.log('Error:  ', err)
    }
}

module.exports = deleteFile