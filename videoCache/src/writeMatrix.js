
module.exports = {

  printSol: function (sol) {

      console.log(sol.servers.length);
      //printToFile(sol.servers.length);

       sol.servers.forEach(function(s){
            var line = s.Id + ' ';
           s.listVideo.forEach(function(videoId){
               line += videoId + ' ';
           });
           console.log(line);
           //printToFile(line);
       });
  }

};

function printToFile(message){
        var fs = require('fs');
        fs.writeFile("/home/test", message, function(err) {
            if(err) {
                return console.log(err);
            }
        });
  }