console.log(model.resultscreen().ansrcount);
let results = model.resultscreen();
console.log(results);
viwe.renderresult(this.modalContent,"Du har svarat","Antal svarade fr[gor"+" "+":"+results.ansrcount,"Antal right fr[gor"+" "+":"+results.right,"Antal wrong fr[gor"+" "+":"+results.wrong,"main--modal--container");
this.modalsave.addEventListener('click', ()=>{
    delete this.testbtn;
    console.log(this.testbtn);
    console.log(this)
    model.saveuseransertoTotal();
    this.refresh()
})