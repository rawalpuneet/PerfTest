xquery version "1.0-ml";

(: Namespace pattern must be:
 : "http://marklogic.com/rest-api/resource/{$rname}"
 : and prefix must match resource name :)
module namespace example =
  "http://marklogic.com/rest-api/resource/wildcard";
import module namespace search = "http://marklogic.com/appservices/search"
     at "/MarkLogic/appservices/search/search.xqy";


declare default function namespace
  "http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

(: do a properties constraint search :)

(: Conventions:
 : Module prefix must match resource name,
 : and function signatures must conform to examples below.
 : The $context map carries state between the extension
 : framework and the extension.
 : The $params map contains parameters set by the caller,
 : for access by the extension.
 :)

(: Function responding to GET method - must use local name 'get':)
declare function example:get(
    $context as map:map,
    $params  as map:map
) as document-node()*
{
    (: set 'output-type', used to generate content-type header :)
    let $output-type :=
        map:put($context,"output-type","application/xml")
    let $q := map:get($params,"q")
    let $limit := (map:get($params,"limit"),"10")[1]
    let $expansions := if( fn:contains($q,"*") or fn:contains($q,"?")) then (

                            cts:word-match($q,"limit= " || $limit )

                        ) else $q
    let $or-query := fn:string-join($expansions," OR ")
    let $content :=
        <results>
             <arg1>{$q}</arg1>
           <expansions>
             {
                for $e in $expansions
                return element expansion {$e}
             }
             </expansions>
             {
                search:search($or-query)
             }

        </results>
    return document { $content }
    (: must return document node(s) :)
};

