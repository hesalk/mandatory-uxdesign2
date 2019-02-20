export default {
    qus: [],
    savequs: function(qusarr){
        qusarr.forEach(element => {
            this.qus.push(element)
        });
    },
    getqus: function(){
        return this.qus
    },
    shuffeldansr:function(){
        let data = this.getqus();
        data.forEach(element => {
            element.newarr = element.incorrect_answers;
            element.newarr.push(element.correct_answer)
            let arr = element.newarr;
            arr = this.shuffle(arr)
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
}