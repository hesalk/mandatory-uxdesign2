(function () {
    'use strict';

    var model = {
        qus: [],
        savequs: function(qusarr){
            qusarr.forEach(element => {
                this.qus.push(element);
            });
        },
        getqus: function(){
            return this.qus
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
            let arr = newQus.newarr;
            for (let i = 0; i < arr.length; i++) {
              const element = arr[i];
              let lable = document.createElement("lable");
              lable.setAttribute("for",element);
              lable.innerHTML = element;
              radio.appendChild(lable);
              lable.className = lableclass;
              let input = document.createElement("input");
              input.className = inputclassname;
              input.setAttribute("type","radio");
              input.textContent = element;
              input.setAttribute("name",count);
              input.setAttribute("value",element);
              input.setAttribute("id",element);
              radio.appendChild(input);
            }
            count++;
          }    },
        renderbtn: function(element,btnClass,txt){
          let btn = document.createElement("button");
          element.appendChild(btn);
          btn.className = btnClass;
          btn.textContent = txt;
          return btn;
        },

    };

    var controller = {
        main: document.querySelector("main"),
        reqthequs: function(){
            viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
            .then(function(data){
                let results =data.results;
                model.savequs(results);
            });
        },
        quizbtnfanc:function(){
            console.log(this.parentElement);
            model.shuffeldansr();
            let main = document.querySelector("main");
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

    };

    controller.reqthequs();
    controller.quizbtn();
    setInterval(function(){
    controller.validatebtn();
    },3000);

}());
