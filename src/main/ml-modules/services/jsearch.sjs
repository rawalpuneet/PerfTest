const search = require('/MarkLogic/appservices/search/search');



function get(context, params) {
   return post(context, params ,{} )
};

function post(context, params, input) {
    // return zero or more document nodes

    var start = params.start || 1;
    var pageLength = params.pageLength || 10;


    context.outputTypes = [ 'application/json' ];
    var q = params.q;


    var query =  cts.query([])

    if(q != null ) {
        query = cts.parse(q, bindings)
    }

    return { "results": fn.subsequence(cts.search(query),start, pageLength),
            "query": query }

};

exports.GET = get;
exports.POST = post;
