var fs = require("fs")
var ejs = require("ejs");
var through = require('through2');
var links = {};
var num = 0;

module.exports = function(output){
  return through.obj(function(file, encoding, callback){
    var content = file.contents.toString();
    var history = file.history.toString();
    var base = file.base.toString();
    var title = content.match(/<title>([^<]*)<\/title>/)[1];
    var url = history.replace(base,"/");

    links[num] = [url,title];
    num++;

    fs.readFile("./map.ejs","utf8", function(err,data){
      var map = ejs.render(data,{"json":links});
      fs.writeFile(output, map);
    });

    callback(null, file);
  });
};
