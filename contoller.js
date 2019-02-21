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
    quizbtnfanc:function(){
        console.log(this.parentElement)
        model.shuffeldansr();
        let main = document.querySelector("main")
        viwe.renderqus(model.getqus(),main,"qus","main--radio","radio--input","radio--lable");
        let valbtn = viwe.renderbtn(main,"main--validation","validat");
    },
    quizbtn: function(){
        let _this = this;
        this.newbtn = viwe.renderbtn(_this.main, "main--btn", "click to start");
        this.newbtn.addEventListener('click', _this.quizbtnfanc);

    },
    validatebtn: function(){
    let test = this.parentElement;
    }

}