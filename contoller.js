import model from "./model";
import viwe from "./view"

export default {
    main: document.querySelector("main"),
    reqthequs: function(){
        viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
        .then(function(data){
            let results =data.results;
            model.savequs(results);
        })
    },
    render: function(){
        viwe.renderqus(model.getqus(),this.main,"qus","main--radio","radio--input");
    },
    ansrs: function(){
       model.shuffeldansr();
    },
    quizbtn: function(){
        let newbtn = viwe.renderbtn(this.main, "main--btn", "click to start");
        console.log(newbtn)//test
        let _this = this;
        newbtn.addEventListener('click', function(){
            let asnrarr = _this.ansrs();
            let render = _this.render();
            
        })
    },

}