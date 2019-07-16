const marklogic = require('marklogic');
const db = marklogic.createDatabaseClient({
    host:     'localhost',
    port:     '8065',
    user:     'admin',
    password: 'admin',
    authType: 'DIGEST'
});
const baseDir        = '/perftest/';
const baseCollection = '/perftest';
const q = marklogic.queryBuilder;
const p = marklogic.planBuilder;



function optic(baseCollection) {
     console.time('optic search');
     var query =
            p.fromLexicons(
                {uri:p.cts.uriReference()},
                null,
                p.fragmentIdCol('docId')
                )
             .where(p.cts.collectionQuery(baseCollection))
             .joinDoc('doc', p.fragmentIdCol('docId'))
             .select('doc');

       return db.rows.query(query, {structure:'array', format:'json',columnTypes:'header'})
               .then(function(response) {
                           console.log(response[1][0])
                            console.timeEnd("optic search")
                            process.exit()

                       });
}

function log(msg, total, max, min, avg) {
    console.log(msg+
        ': total='+asSeconds(total)+
        ', max='+asSeconds(max)+
        ', min='+asSeconds(min)+
        ', avg='+asSeconds(avg));
}

function asSeconds(milliseconds) {
    return (milliseconds / 1000).toFixed(3);
}

optic("10k")
//testops();