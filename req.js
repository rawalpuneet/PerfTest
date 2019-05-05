	var request = require('request')

    var search = process.argv[2];

	console.time('simple search');
	var pageLength = 50000
	var port = '8065'
	var host = 'localhost'

	var mlsearch = 'http://'+host+':'+port + '/v1/search?format=json&options=all&pageLength=' + pageLength;
	var jsearch = 'http://'+host+':'+port+'/v1/resources/jsearch?rs:pageLength=' + pageLength;

    if(search == 'mlsearch') {
        search = mlsearch
    } else if(search == 'jsearch') {
        search = jsearch
    } else {
        search = jsearch
    }
    console.log("POST : " + search);

	var options = {
	    'url': encodeURI(search),
	    'auth': {
	        'user': 'admin',
	        'pass': 'admin',
	        'sendImmediately': false
	    }
	};

	var request = request.post(options, function(error, response, body){
	    if (!error && response.statusCode == 200){
	        //console.log('body : ' + body)
			console.timeEnd('simple search');
	    }
	    else{
	        console.log('Code : ' + response.statusCode)
	        console.log('error : ' + error)
	        console.log('body : ' + body)

			console.timeEnd('simple search');
	  	  	process.exit();

	    }
	});
