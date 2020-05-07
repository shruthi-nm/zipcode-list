const sql = require("../config/database");

// constructor
const Zipcode = function(zip) {
  this.state_id = zip.state_id;
  this.city_name = zip.city_name;
  this.city_id = zip.city_id;
  this.state_name = zip.state_name;
  this.country_id = zip.country_id;
  this.country_name = zip.country_name;
  this.file_url = zip.file_url;
};

Zipcode.insert = (newZip, result) => {
  sql.query("INSERT INTO zipcode SET ?", newZip, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newZip });
  });
};


Zipcode.getAll = result => {
  sql.query("SELECT * FROM zipcode", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
module.exports = Zipcode;