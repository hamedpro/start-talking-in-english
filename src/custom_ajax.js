export function object_to_url({path,params={}}){
    var path_with_query = path + "?";
    Object.keys(params).forEach(key=>{
        path_with_query += (key + "=" + params[key] + "&")
    })
    if(Object.keys(params).length != 0){
        path_with_query = path_with_query.slice(0,-1)
        //it removes last "&" if its there
    }
    return path_with_query
}
export async function customAjax({path= "http://localhost:4000",params={},method= "GET"}){
    var path_with_query = object_to_url({
        path,
        params
    })
    var parsed_json = null;
    
    console.info("a fetch request is going to happen with this info" + "path : " + path_with_query + " method : " + method)
    return await fetch(path_with_query,{
        method
    })
}