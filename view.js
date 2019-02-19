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
    
}