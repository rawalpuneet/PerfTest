const marklogic = require('marklogic');
const my = require('./my-connection.js');

const db = marklogic.createDatabaseClient(my.connInfo);
const qb = marklogic.queryBuilder;
console.time('simple search');
// First search sets the timestamp value
db.documents.query(
  qb.where(
	  qb.and(
	  	//qb.range('StartDate', '>=', '1900-01-01')
		  //,
		//qb.value('RequestType','GRI*'),
		//qb.not(  qb.value('ErrorMessage',['Wes*', 'Other Messages']) )  
      )
	  
  
  )
 // .calculate( qb.facet('collection', qb.collection()) ) 
//  .calculate(qb.facet('RequestType'))
  .withOptions({search:['unfiltered'],  categories: ['content']}  )
   .slice(0,10000)

).result().then( function(results) {
	
    // console.log(JSON.stringify(results, null, 2));
    console.timeEnd('simple search');
  process.exit()	
});




