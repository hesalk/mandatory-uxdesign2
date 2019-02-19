import model from "./model";
import viwe from "./view"

export default {
    reqthequs: function(){
        viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
        .then(function(data){
            let results =data.results;
            console.log(results);//test-to-delete
            model.savequs(results);
        })
    },
}