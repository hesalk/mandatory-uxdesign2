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
        count++
      };
    },
    renderbtn: function(element,btnClass,txt){
      let btn = document.createElement("button");
      element.appendChild(btn);
      btn.className = btnClass;
      btn.textContent = txt;
      return btn;
    },

}