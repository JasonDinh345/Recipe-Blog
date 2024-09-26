const express = require('express')
const router = express.Router()
const axios = require('axios')
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const dotenv = require('dotenv')
const path = require('path');
const qs = require("qs")
dotenv.config()

const upload = multer({ dest: '../uploads/' });

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI )

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });


router.post('/upload', upload.single('image'), async (req, res) => {
    const filePath = req.file.path;
    const folderId = '12QivX6YroMtzMvUkM51VAWbRr6J7Bdr-';
    
    try {
      // Step 1: Upload the file to Google Drive
      const response = await drive.files.create({
        requestBody: {
          name: req.body.name,
          mimeType: req.file.mimetype,
          parents: [folderId],
        },
        media: {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(filePath),
        },
      });
      
      // Step 2: Make the file publicly accessible
      const fileId = response.data.id;
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      // Step 3: Get the file's public URL
      const result = await drive.files.get({
        fileId,
        fields: 'webViewLink',
      });
  
      const fileUrl = result.data.webViewLink;
  
      // Step 4: Save the file's URL in MongoDB
      try{
        await axios.post("http://localhost:3000/ingredient", {
            name: req.body.name,
            image: fileUrl
        })  
      }catch(err){
        console.log("Failed to submit ingredient into database!", err)
      }
      // Step 5: Delete the file from the local `uploads/` folder after upload
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted from server');
        }
      });
  
      res.status(200).json({ message: 'File uploaded and deleted successfully', url: fileUrl });
  
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      res.status(500).json({ error: 'Failed to upload file' });
  
      // In case of an error, delete the file to clean up the `uploads/` folder
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file after upload failure:', err);
        }
      });
    }
  });
  


module.exports = router