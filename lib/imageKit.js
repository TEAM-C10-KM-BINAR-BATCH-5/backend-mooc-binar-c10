require("dotenv").config()

var ImageKit = require("imagekit")

var imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT
})

module.exports = imagekit
