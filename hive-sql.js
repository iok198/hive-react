var mysql = require('mysql')
var connection = mysql.createConnection({
  host		: '104.197.99.180',
  user		: 'root',
  password	: '?UKrapa72!',
  multipleStatements: true
})

module.exports = connection 
