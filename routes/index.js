var express = require('express');
var router = express.Router();
const axios = require('axios');
const Zipcode = require("../models/zipcode.model");
const asyncHandler = require('express-async-handler');
const Path = require('path') ;
const fs = require('fs');

router.get('/', asyncHandler(async (req, res, next) => {
    const url = 'http://lms.labyrinthelab.com/api/ws_get_zipcode_details.php?zipcode=33186';
    const response = await axios.get(url, { headers: {
        "access_token": 'ZiPcoDeDetAiLs'
      }})
    console.log(response.data);
    const result  = response.data.RESPONSE_DATA;
    const zipcode = new Zipcode({
        state_id: result.state_id,
        city_name: result.city_name,
        city_id: result.city_id,
        state_name: result.state_name,
        country_id: result.country_id,
        country_name: result.country_name,
        file_url: result.file_url
      });
      //console.log(result)
     const save_res = await save_zipcode_details(zipcode);
     downloadImage(result.file_url);
     const list  = await getAllZipcodes();
     res.render("zipcodelist", {
      list: list
    });
}));


function save_zipcode_details(data) {
    return new Promise(function(resolve, reject) {
    Zipcode.insert(data, (err, res) => {
        if (err) {
          resolve(err);
        } else if (res) {
          resolve(res);
        }
      });
    });
  }

  async function downloadImage (url) {  
    const path = Path.resolve(__dirname, '../public/download', 'code.pdf')
    const writer = fs.createWriteStream(path);  
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }


  function getAllZipcodes(){
    return new Promise(function (resolve, reject) {
      Zipcode.getAll((err, res) => {
        if (err) {
          resolve(err);
        } else {
          console.log(JSON.parse(JSON.stringify(res)))
          resolve(JSON.parse(JSON.stringify(res)));
        }
      });
    });
  }
module.exports = router;