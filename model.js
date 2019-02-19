export default {
    qus:[],
    getqus: function(){
        return this.qus
    },
    savequs: function(qusarr){
        qusarr.forEach(element => {
            this.qus.push(element);
        });
        console.log(this.qus);//test-to-delete
    }

}