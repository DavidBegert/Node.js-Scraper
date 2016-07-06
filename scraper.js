const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    fs.writeFile("images.csv", "", (err) => {
      if(err){ return console.log(err); }
    });
    $('tr').each(function() {
      var codeToAppend = $(this).find('td:first-child > code').text();
      var linkToAppend = $(this).find('a').attr('href');
      var fileType;
      if ($(this).find('a').text().split('/').length === 2){
        fileType = "directory";
      }else {
        var linkSplit = $(this).find('a').text().split('.');
        fileType = linkSplit[linkSplit.length - 1];
      }
      var dataToAppend = `${codeToAppend},${linkToAppend},${fileType}\n`
      fs.appendFile("images.csv", dataToAppend, (err) => {
        if (err) {
          return console.log(err);
        }
      });
    });
  }
});
