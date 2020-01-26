const fs = require("fs");
const http = require("http");
const express = require("express");
const Redshift = require("node-redshift");
// const pg = require("pg")
// const { Pool, Client } = require('pg')
// const API_ENDPOINT_URL_GENERIC = "//localhost:3001/generic_query";
const app = express();

require('dotenv').config();

const httpServer = http.createServer(app);

httpServer.listen(3002);

app.set("jsonp callback", true);

app.use(function(req, res, next) {
  var origin = req.get("origin");

  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "no-cache");

  if (req.method === "OPTIONS") {
    res.header("Cache-Control", "max-age=3600");
    res.header("Vary", "Accept");
    res.header("Content-Type", "text/plain");
  }

  next();
});

var user = process.env.SQL_USER;
var password = process.env.SQL_PASS;
var database = "postgres";
var port = process.env.SQL_PORT;
var host = process.env.SQL_IP;
var client = {
  user: user,
  database: database,
  password: password,
  port: port,
  host: host
};
// var redshift = 1;
var redshift = new Redshift(client);

// const client = new Client({
//   user: user,
//   database: database,
//   password: password,
//   port: port,
//   host: host
// })
// console.log(user)
// console.log(password)
// client.connect()
// client.query('SELECT 1', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


/**
 * 1. Loads SQL query from file
 * 2. Parses it, replacing parameter like this one {{exampleParameter}} with input parameter values
 * 3. Runs query against postgress database and returns results
 * @param {String} queryFileName 
 * @param {Object} parameters - parameter values for the given query (i.e. partner key, product domains, etc)
 */
function loadAndRunQuery(queryFileName,parameters) {
  return new Promise((resolve, reject) => {
    var fileName = "server/queries/" + queryFileName + ".sql";
 
    fs.readFile(fileName, "utf8", function(error, fileData) {
      if (error) {

        reject(error);
      } else {
        var parsedFileData = fileData
        
        for(key in parameters) {          
          var re = new RegExp('{{'+ key + '}}', "g");
          parsedFileData  = parsedFileData.replace(re, parameters[key]);
        }

        redshift.query(parsedFileData, { raw: true }, function(error, queryData) {
          if (error) {
            reject(error);
          } else {
            resolve(queryData);
          }
        });
      }
    });
  });
}


/** This is the one, hot dog */
app.get("/generic_query", function(req, res) {
  var parameters = {}
  // console.log(json.stringify(req))
  for (item in req.query) {
    console.log("item: " + item + " - " + req['query'][item])
    parameters[item] = req['query'][item]
    }
  loadAndRunQuery(parameters.queryName,parameters).then(data => {
    res.json(data);
  });
});




app.get("/test_query", function(req, res) {
  
  var parameters = {} 
  queryName = 'test_query'
  // console.log("POOO")
  loadAndRunQuery(queryName).then(data => {
    res.json(data);
  });
});

