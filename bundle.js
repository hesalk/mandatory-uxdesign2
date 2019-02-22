(function () {
    'use strict';

    var model = {
        qus: [],
        useransr: [],
        useransrTotal:[],
        savequs: function(qusarr){
            qusarr.forEach(element => {
                this.qus.push(element);
            });
        },
        rightansrHolder:function(){
            let useransr = this.getuseransr();
            let count = 0;
                for (let i = 0; i < useransr.length; i++) {
                    const element = useransr[i];
                    if (element.valid === true) {count++;}     }
         return count;
        },
        saveuseransertoTotal: function(){
            console.log(this);
            let ansrarr = this.getuseransr();
            ansrarr.forEach(element => {
                this.useransrTotal.push(element);
            });
            console.log(this.useransrTotal);
        },
        saveuseranser: function(qus,valid){
            let newnast = {
                qus: qus,
                valid: valid,
            };
            this.useransr.push(newnast);
            console.log(this.getuseransr());
        },
        wrongansrHolder:function(){
            let useransr = this.getuseransr();
            let count = 0;
              for (let i = 0; i < useransr.length; i++) {
                  const element = useransr[i];
                  if (element.valid === false) {count++;}            }
          return count;
        },
        resultscreen: function(){
            let useransr = this.getuseransr();
            let result = {
                ansrcount: useransr.length,
                right:this.rightansrHolder(),
                wrong:this.wrongansrHolder()
            };
            return result
        },
        saveTotaltoCurr: function(){
            this.useransr.length = 0;
            let arr = this.getuseranserTotal();
            arr.forEach(element => {
                this.useransr.push(element);
            });
            let result = this.resultscreen();
            return result;
        },
        getuseransr: function(){
            return this.useransr;
        },
        getuseranserTotal:function(){
            return this.useransrTotal
        },
        getqus: function(){
            return this.qus;
        },
        refreshModell:function(){
            this.qus.length = 0;
            this.saveuseransertoTotal();
            this.useransr.length = 0;
            console.log(this.getuseranserTotal());
        },
        shuffeldansr:function(){
            let data = this.getqus();
            data.forEach(element => {
                element.newarr = element.incorrect_answers;
                element.newarr.push(element.correct_answer);
                let arr = element.newarr;
                arr = this.shuffle(arr);
            });
        },
        
        shuffle: function(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
    };

    var viwe = {
        ajax: function req(method, url, data) {
            return new Promise(function(resolve, reject) {
              let req = new XMLHttpRequest();
              req.addEventListener('load', function() {
                if (this.status >= 200 && this.status < 300) {
                  let data1 = null;
                  if (this.responseText) {
                    data1 = JSON.parse(this.responseText);
                  } 
                  resolve(data1);
                } else {
                  reject(new Error('Invalid status'));
                }
        });
        req.open(method, url);
        if (data) {
          req.setRequestHeader('Content-Type', 'application/json');
          req.send(JSON.stringify(data));
        } else {
          req.send();
        }
      });
        },
        renderqus: function(data,element,theClass,theotherClass,inputclassname,lableclass){
          console.log(data);
          let count = 0;
          for (let i = 0; i < data.length; i++) {
            const newQus = data[i];
            let qusholder = document.createElement("div");
            qusholder.className = theClass;
            qusholder.innerHTML = newQus.question;
            element.appendChild(qusholder);
            let radio = document.createElement("div");
            qusholder.appendChild(radio);
            radio.className = theotherClass;
            newQus.inputRadio = [];
            let arr = newQus.newarr;
            for (let i = 0; i < arr.length; i++) {
              const element = arr[i];
              let alter = document.createElement("div");
              alter.className = "main--radio--altr list-group-item";
              radio.appendChild(alter);
              let lable = document.createElement("lable");
              lable.setAttribute("for",element);
              lable.innerHTML = element;
              lable.className = lableclass;
              let inputdiv = document.createElement("div");
              inputdiv.className = "mdc-radio ";
              let inputback = document.createElement("div");
              inputback.className = "mdc-radio__background";
              let inputoutercircle = document.createElement("div");
              inputoutercircle.className = "mdc-radio__outer-circle";
              let inputinnercircle = document.createElement("div");
              inputinnercircle.className = "mdc-radio__inner-circle";
              let input = document.createElement("input");
              input.className = inputclassname;
              input.setAttribute("type","radio");
              input.textContent = element;
              input.setAttribute("name",count);
              input.setAttribute("value",element);
              input.setAttribute("id",element);
              newQus.inputRadio.push(input);
              inputdiv.appendChild(input);
              inputdiv.appendChild(inputback);
              inputback.appendChild(inputoutercircle);
              inputback.appendChild(inputinnercircle);
              alter.appendChild(inputdiv);
              alter.appendChild(lable);
            }
            count++;
            console.log(newQus);
            newQus.radioHolder = radio;
            console.log(newQus.radioHolder);//test
          }    },
        renderbtn: function(element,btnClass,txt){
          let btn = document.createElement("a");
          let span = document.createElement("span");
          element.appendChild(btn);
          btn.className = btnClass;
          btn.textContent = txt;
          return btn;
        },
        refresh:function(element){
          element.innerHTML = "";

        },
        renderresult:function(element,txt,count,right,wrong,divClass){
          element.textContent = "";
          let divCountainer = document.createElement("div");
          divCountainer.className = divClass;
          let h1 = document.createElement("h1");
          let pCount = document.createElement("p");
          let pRight = document.createElement("p");
          let pWrong = document.createElement("p");
          h1.textContent = txt;
          pRight.textContent = right;
          pWrong.textContent = wrong;
          pCount.textContent = count;
          divCountainer.appendChild(h1);
          divCountainer.appendChild(pCount);
          divCountainer.appendChild(pRight);
          divCountainer.appendChild(pWrong);
          element.appendChild(divCountainer);
        }

    };

    var controller = {
        main: document.querySelector(".mainCon"),
        modalContent: document.querySelector("#valid--modal"),
        modalsave: document.querySelector("#main--modal--save"),
        panelSec: document.querySelector("#panel--sec"),
        stats: document.querySelector("#menu--stats"),
        toggelBtn: document.querySelector(".toggle-button"),
        reqthequs: function(){
            console.log(model.getqus());
            viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
            .then(function(data){
                let results =data.results;
                model.savequs(results);
            });
        },
        style:function(){
            document.querySelector(".mdc-top-app-bar").style.position = "sticky";
            document.querySelector(".mdc-top-app-bar").style.top = "0px";
        },
        quizbtnfanc:() => {
            model.shuffeldansr();
            let main = document.querySelector(".mainCon");
            main.textContent = "";
            viwe.renderqus(model.getqus(),main,"qus card","main--radio card list-group list-group-flush","radio--input mdc-radio__native-control","radio--lable list-group list-group-flush");
            let valbtn = viwe.renderbtn(main,"main--validation btn btn-success","validat");
            valbtn.setAttribute("data-toggle","modal");
            valbtn.setAttribute("data-target","#exampleModal");
            return valbtn;
        },
        quizbtn: function(){
            model.refreshModell();
            console.log(model.getuseransr());
            this.newbtn = viwe.renderbtn(this.panelSec, "main--btn material-icons mdc-top-app-bar__action-item", "play_arrow");
            this.newbtn.addEventListener('click', ()=>{
                console.log(this);
                this.testbtn = this.quizbtnfanc();
                console.log(this.testbtn);
                this.newbtn.remove();
                this.testbtn.addEventListener('click', ()=>{
                    this.validbtnfunc();
                    let results = model.resultscreen();
                    console.log(results);
                    viwe.renderresult(this.modalContent,"Du har svarat","Antal svarade fr[gor"+" "+":"+results.ansrcount,"Antal right fr[gor"+" "+":"+results.right,"Antal wrong fr[gor"+" "+":"+results.wrong,"main--modal--container");
                });
            });
            this.savebt();
        },
        tst:function(){
            console.log(this);
        },
        savebt:function(){
            let _this = this;
            this.modalsave.addEventListener('click', function testfunc(){
                console.log(_this);
                _this.refresh();
                _this.modalsave.removeEventListener('click',testfunc, true);
            }, true);
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
            console.log(this.stats);
            this.stats.addEventListener('click', function testfunc2(){
                console.log(_this);
                console.log("_this");
                viwe.refresh(_this.main);
                let results = model.saveTotaltoCurr();
                console.log(results);
                viwe.renderresult(_this.main,"Du har svarat","Antal svarade fr[gor"+" "+":"+results.ansrcount,"Antal right fr[gor"+" "+":"+results.right,"Antal wrong fr[gor"+" "+":"+results.wrong,"main--modal--container");
                _this.stats.removeEventListener('click', testfunc2, true);
            },true);
        },
        validbtnfunc: function(){
            console.log("validbtn");//test
            console.log(this);//test
            let data = model.getqus();
            console.log(data);
            data.forEach(element => {
                let inputarr = element.inputRadio;
                for (let i = 0; i < inputarr.length; i++) {
                    const el = inputarr[i];
                    if(el.checked === true){
                        console.log(element.question);
                        if (el.id === element.correct_answer) {
                            console.log("ok");
                            model.saveuseranser(element.question,true);
                        }else{model.saveuseranser(element.question,false);}
                    }
                }
            });
        },

    };

    controller.reqthequs();
    controller.quizbtn();
    controller.style();

}());
