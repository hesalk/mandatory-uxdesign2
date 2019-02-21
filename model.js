export default {
    qus: [],
    useransr: [],
    useransrTotal:[],
    savequs: function(qusarr){
        qusarr.forEach(element => {
            this.qus.push(element)
        });
    },
    rightansrHolder:function(){
        let useransr = this.getuseransr();
        let count = 0;
            for (let i = 0; i < useransr.length; i++) {
                const element = useransr[i];
                if (element.valid === true) {count++};
     }
     return count;
    },
    saveuseransertoTotal: function(){
        console.log(this)
        let ansrarr = this.getuseransr();
        ansrarr.forEach(element => {
            this.useransrTotal.push(element);
        });
        console.log(this.useransrTotal);
        this.saveTotaltoCurr();
    },
    saveuseranser: function(qus,valid){
        let newnast = {
            qus: qus,
            valid: valid,
        }
        this.useransr.push(newnast);
    },
    wrongansrHolder:function(){
        let useransr = this.getuseransr();
        let count = 0;
          for (let i = 0; i < useransr.length; i++) {
              const element = useransr[i];
              if (element.valid === false) {count++};
            }
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