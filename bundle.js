(function () {
    'use strict';

    var model = {
        qus:[],
        getqus: function(){
            return this.qus
        },
        savequs: function(qusarr){
            qusarr.forEach(element => {
                this.qus.push(element);
            });
            console.log(this.qus);
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
        
    };

    var controller = {
        reqthequs: function(){
            viwe.ajax("GET","https://opentdb.com/api.php?amount=10")
            .then(function(data){
                let results =data.results;
                console.log(results);
                model.savequs(results);
            });
        },
    };

    controller.reqthequs();

}());
