const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const drive = require('./app')

async function UploadFile(name, stream){
    try{

        const filePath = path.join(__dirname, `../../tmp/uploads/${name}`)

        const response = await drive.files.create({
            requestBody: {
                parents: ['1J79erZgQiwSEJa9IaRq794H6e_zS1dUF'],
                name: `${name}`,
            },
            media: {
                body: fs.createReadStream(filePath)
            },
            fields: '*'
        })

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        return response.data

    }catch(err){
        console.log('Error:  ', err)
    }
}

module.exports = UploadFile