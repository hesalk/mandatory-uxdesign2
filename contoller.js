import model from "./model";
import viwe from "./view"
export default {
    main: document.querySelector(".mainCon"),
    modalContent: document.querySelector("#valid--modal"),
    modalsave: document.querySelector("#main--modal--save"),
    panelSec: document.querySelector("#panel--sec"),
    stats: document.querySelector("#menu--stats"),
    toggelBtn: document.querySelector(".toggle-button"),
    reqthequs: function(){
        console.log(model.getqus())
        viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
        .then(function(data){
            let results =data.results;
            model.savequs(results);
        })
    },
    style:function(){
        document.querySelector(".mdc-top-app-bar").style.position = "sticky";
        document.querySelector(".mdc-top-app-bar").style.top = "0px"
    },
    quizbtnfanc:() => {
        model.shuffeldansr();
        let main = document.querySelector(".mainCon")
        main.textContent = ""
        viwe.renderqus(model.getqus(),main,"qus card","main--radio card list-group list-group-flush","radio--input mdc-radio__native-control","radio--lable list-group list-group-flush");
        let valbtn = viwe.renderbtn(main,"main--validation btn btn-success","validat");
        valbtn.setAttribute("data-toggle","modal");
        valbtn.setAttribute("data-target","#exampleModal");
        return valbtn;
    },
    quizbtn: function(){
        model.refreshModell();
        console.log(model.getuseransr())
        this.newbtn = viwe.renderbtn(this.panelSec, "main--btn material-icons mdc-top-app-bar__action-item", "play_arrow");
        this.newbtn.addEventListener('click', ()=>{
            console.log(this)
            this.testbtn = this.quizbtnfanc();
            console.log(this.testbtn);
            this.newbtn.remove();
            this.testbtn.addEventListener('click', ()=>{
                this.validbtnfunc();
                let results = model.resultscreen();
                console.log(results);
                viwe.renderresult(this.modalContent,"Du har svarat","Antal svarade fr[gor"+" "+":"+results.ansrcount,"Antal right fr[gor"+" "+":"+results.right,"Antal wrong fr[gor"+" "+":"+results.wrong,"main--modal--container");
            })
        });
        this.savebt();
    },
    tst:function(){
        console.log(this)
    },
    savebt:function(){
        let _this = this
        this.modalsave.addEventListener('click', function testfunc(){
            console.log(_this);
            _this.refresh();
            _this.modalsave.removeEventListener('click',testfunc, true)
        }, true)
    },
    refresh:function(){
        viwe.refresh(this.main);
        model.refreshModell();
        this.reqthequs();
        this.newbtn.remove();
        this.quizbtn();
    },
    statsfunc: function(){
        let _this = this;
        console.log(this.stats)
        this.stats.addEventListener('click', function testfunc2(){
            console.log(_this);
            console.log("_this");
            viwe.refresh(_this.main);
            let results = model.saveTotaltoCurr();
            console.log(results)
            viwe.renderresult(_this.main,"Du har svarat","Antal svarade fr[gor"+" "+":"+results.ansrcount,"Antal right fr[gor"+" "+":"+results.right,"Antal wrong fr[gor"+" "+":"+results.wrong,"main--modal--container");
            _this.stats.removeEventListener('click', testfunc2, true);
        },true)
    },
    validbtnfunc: function(){
        console.log("validbtn");//test
        console.log(this);//test
        let data = model.getqus();
        console.log(data)
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