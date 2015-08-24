var fs = require('fs');
var filePath = "/full/path/deny-from-aws/.htaccess";
var request = require('request');
var allToBlock = "\n##START-AWS-BLOCK##\n";
request.get('https://ip-ranges.amazonaws.com/ip-ranges.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
		var out = JSON.parse(body);
		//console.log("Out: %j", out['prefixes']);
		for (var a=0, length = out['prefixes'].length; a < length; a++) {
		  allToBlock += "Deny from " + out['prefixes'][a]['ip_prefix'] + "\n";
		}
		allToBlock += "##END-AWS-BLOCK##";
		//console.log(allToBlock);
		fs.appendFile(filePath,allToBlock,function(err){
				if(err){
						console.log(err);
				}else{
						console.log("Completed & written to file");
				}
		});
	}
});
