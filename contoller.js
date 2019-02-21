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
    quizbtnfanc:() => {
        model.shuffeldansr();
        let main = document.querySelector("main")
        viwe.renderqus(model.getqus(),main,"qus","main--radio","radio--input","radio--lable");
        let valbtn = viwe.renderbtn(main,"main--validation btn btn-success","validat");
        valbtn.setAttribute("data-toggle","modal");
        valbtn.setAttribute("data-target","#exampleModal");
        return valbtn;
    },
    quizbtn: function(){
        this.newbtn = viwe.renderbtn(this.main, "main--btn btn btn-primary", "click to start");
        this.newbtn.addEventListener('click', ()=>{
            console.log(this)
            this.testbtn = this.quizbtnfanc();
            console.log(this.testbtn);
            this.testbtn.addEventListener('click', ()=>{this.validbtnfunc()})
        });

    },
    validbtnfunc: function(){
        console.log("validbtn");//test
        console.log(this);//test
        let data = model.getqus();
        data.forEach(element => {
            let inputarr = element.inputRadio;
            for (let i = 0; i < inputarr.length; i++) {
                const el = inputarr[i];
                if(el.checked === true){
                    console.log(element.question);
                    if (el.id === element.correct_answer) {
                        console.log("ok");
                        model.saveuseranser(element.question,true)
                    }else{model.saveuseranser(element.question,false)}
                }
            }
        });

    },

}