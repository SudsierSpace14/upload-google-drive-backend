require('dotenv').config()

const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; 

// console.log('client id:', process.env.GOOGLE_CLIENT_ID)
// console.log('client secret', process.env.GOOGLE_CLIENT_ID)
// console.log('refresh token:', process.env.REFRESH_TOKEN)
const oauth2CLient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
)

oauth2CLient.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2CLient
})

const filePath = path.join(__dirname, 'uploads/gradiente_mgm.png')

async function UploadFile(){
    try{
        const response = await drive.files.create({
            requestBody: {
                parents: ['1J79erZgQiwSEJa9IaRq794H6e_zS1dUF'],
                name: 'mgm-gradient.png',
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            },
        })

        console.log(response.data)

    }catch(err){
        console.log('Error:  ', err)
    }
}

async function DeleteFile(){
    try{
        const res = await drive.files.delete({
            fileId: '11xvSwhfPhkPPMr0dchWeEaQYfp9Fs7Xi'
        })

        console.log(res.status)
    }catch(err){
        console.log('mano deu um erro aqui: ', err)
    }
}

async function publicURL(){
    try{

    }catch{

    }
}

async function FindFiles(){
    //'1J79erZgQiwSEJa9IaRq794H6e_zS1dUF' in parents    mimeType = 'application/vnd.google-apps.folder'
    try{
        const myFiles = await drive.files.list({
            q: "'1J79erZgQiwSEJa9IaRq794H6e_zS1dUF' in parents", 
            spaces: 'drive',
            corpora: "user",
            fields: "files(*)",
        })
        return myFiles.data.files
    }catch{
        console.log(';-;')
    }
}

module.exports = drive