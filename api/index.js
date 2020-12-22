/* eslint-disable object-shorthand */
/* eslint-disable no-console */
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// setup for local storage
// for a SCALABLE solution 
// we should be using a CDN
// for file storage and a db
// for metadata
const multer = require('multer')
const storage = multer.diskStorage({
	destination(req, file, cb) {
		console.log(req.body);
		console.log(req.body.publicAccess);
        
		var accessFolder = req.body.publicAccess == 'true' ? '/public' : '/private';
		cb(null, path.join(__dirname, accessFolder))
	},
	filename(req, file, cb) {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })

// allowing viewing of all public images
app.use('/images/public', express.static(__dirname+'/public'))




app.post('/images', upload.array('images'), (req,res) => {
	// add further input validation [i.e. metadata]
	// create Image objects modeling the metadata
	// and push to database
	res.send({success: true})
})

/*
*   Read public image directory and send user the array of filenames
*   *** a better method would be to implement a cache of public filenames
*       combined with the filenames being stored in a database not locally
*/
app.get('/images/public/list', (req,res) =>{
	var publicFolder = __dirname + '/public'
	var fileNames = []
	fs.readdir(publicFolder, (err, files) => {
		if(files){
			files.forEach(file => {
				fileNames.push(file);
			});
			res.send({success:true, fileNames: fileNames})
		}else{
			if(err)
				console.error(err);
			res.send({success: false, error: 'No files found.'})
		}
		
	});

})


/*
*   Use a static password [would change] to verify user
*   create a temporary json web token to validate the users request for the images
*/
app.post('/images/private', (req,res)    =>{
	// a better method would be to use profiles that have 
	// explicit permissions and use JWT authTokens to authenticate users
	if(req.body.password == 'shopify'){
		var privateFolder = __dirname + '/private'
		var fileNames = []
		fs.readdir(privateFolder, (err, files) => {
			if(files){
				files.forEach(file => {
					fileNames.push(file);
				});
				jwt.sign(
					{   exp: Math.floor(Date.now() / 1000) + (60 * 60), //token that expires in 1 hour
						foo: 'bar' 
					},  
					'guest',
					function(err, token) {
						if(err){
							console.error(err)
						}
						console.log(token);
				        res.send({success:true, fileNames: fileNames, token: token})                    
					});
			}else{
				if(err)
					console.error(err);
				res.send({success: false, error: 'No files found.'})
			}
		
		});
	}else{
		res.send({success: false, error: 'Wrong Password'})
	}
})

app.get('/images/private/:token/:fileName', (req,res)   => {
	console.log(req.params);
	jwt.verify(req.params.token, 'guest', function(err, decoded){
		if(err){
			if(err.name == 'TokenExpiredError'){
				res.send({success:false, error: 'Please get a new token'})
			}else{
				console.error(err);
				res.sendStatus(500);
			}			
		}else{
			res.sendFile(__dirname+'/private/'+req.params.fileName)
		}
	})
})

module.exports = {
	path: '/api/',
	handler: app,
}
