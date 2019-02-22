export default {
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
      console.log(data)
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
          inputback.className = "mdc-radio__background"
          let inputoutercircle = document.createElement("div");
          inputoutercircle.className = "mdc-radio__outer-circle"
          let inputinnercircle = document.createElement("div");
          inputinnercircle.className = "mdc-radio__inner-circle"
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
        count++
        console.log(newQus);
        newQus.radioHolder = radio;
        console.log(newQus.radioHolder);//test
      };
    },
    renderbtn: function(element,btnClass,txt){
      let btn = document.createElement("a");
      let span = document.createElement("span")
      element.appendChild(btn);
      btn.className = btnClass;
      btn.textContent = txt;
      return btn;
    },
    refresh:function(element){
      element.innerHTML = "";

    },
    renderabout: function(element,inner,divClass,h2Class){
      let div = document.createElement("div");
      div.className = divClass;
      let h2 = document.createElement("h2");
      h2.className = h2Class
      element.appendChild(div);
      div.appendChild(h2);
      h2.textContent = inner;
    },
    renderresult:function(element,txt,count,right,wrong,divClass){
      element.textContent = ""
      let divCountainer = document.createElement("div");
      divCountainer.className = divClass
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
      element.appendChild(divCountainer)
    }

}