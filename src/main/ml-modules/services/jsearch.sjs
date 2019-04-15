var dtPros = [];
var strPros =
        [
                "ClientRequestID",
                "RequestGuid",
                "RequestName",
                "ActionName",
                "Duration",
                "ErrorMessage",
                "UserName",
                "ReportFileID",
                "HostName",
                "RequestLevel",
                "UserFirm",
                "RequestFirmID",
                "ResultCount",
                "LogFileName"
        ]

function get(context, params) {
   return post(context, params ,{} )
};

function post(context, params, input) {
    // return zero or more document nodes
    var bindings = {}
    var pageLength = params.pageLength || 10;
    var start = params.start || 1;

    for (s of dtPros) {
        bindings[s] = cts.jsonPropertyReference(s,['type=dateTime'])
    }
    for (s of strPros) {
        bindings[s] = cts.jsonPropertyReference(s,['type=string','collation=','unchecked'])
    }

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
