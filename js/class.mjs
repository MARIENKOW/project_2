class Task{
   constructor(obj,print){
      this.name = obj.name;
      this.task = obj.task;
      this.block = print.block
      this.input = print.input
      this.timer = print.timer
      this.forBestResult = print.forBestResult;
      this.taskLength = 0;
      this.bestResult = this.getLocalStorage()
      this.time = 0;
   }
   get bestResult(){
      return this._bestResult;
   }
   set bestResult(str){
      this._bestResult = str;
      if(str === 0)return
      this.forBestResult.textContent = str
   }
   printTask(){
      const arrayFromString = this.task.split('\n');
      arrayFromString.forEach((word,i)=>{
         const spanLine = document.createElement('span');
         spanLine.className = 'test__line'
         const arrayFromWord = Array.from(word);
         arrayFromWord.push('gap')
         arrayFromWord.forEach((letter,j)=>{
            const spanLetter = document.createElement('span');
            this.taskLength = spanLetter.dataset.index = arrayFromString.reduce((ac,el,ind)=>ind>=i?ac:ac+el.length+1,0)+j
            if(letter === " "){
               spanLetter.innerHTML = "&nbsp";
            }else if(letter === "gap"){
               spanLetter.innerHTML = "&nbsp";
               spanLetter.className = 'gap'
            }else{
               spanLetter.textContent = letter;
            }
            spanLine.appendChild(spanLetter)
         })
         this.block.appendChild(spanLine)
      })
   }
   alwaysInFocus(){
      this.input.focus();
      document.onclick=()=>{
         this.input.focus()
      }
      const firstLetter = document.querySelector('[data-index="0"]')
      firstLetter.classList.add('animation')
   }
   starToPrint(){
      this.input.addEventListener('input',(e)=>{
         if(this.onPause) return;
         if(!this.interval)this.timerStart();
         const last = this.input.value.length - 1;
         const currentElement = document.querySelector(`[data-index="${last}"]`)
         if(e.inputType==='deleteContentBackward') return this.deleteLetters.call(this,last)
         if(this.isBadLetter) return this.input.value = this.input.value.slice(0,-1);
         if(currentElement.classList.contains('gap')) return this.stopPrinting.call(this,last);
         if(this.input.value[last] === currentElement?.textContent || (this.input.value[last] === ' ' && currentElement?.innerHTML === "&nbsp;")){
            this.printingLetters(last);
            if(last !== this.taskLength-1)return
            this.saveBestResult()
            this.onPause = true
            return this.timerStop()
         }else{
            this.stopPrinting.call(this,last);
         }
      })
      this.input.addEventListener('keydown',(e)=>{
         if(this.onPause) return;
         if(this.isBadLetter)return
         if(e.key === 'Enter'){
            const last = this.input.value.length;
            const currentElement = document.querySelector(`[data-index = "${last}"]`)
            let valueHelper = 0
            if(currentElement.classList.contains('gap')){
               this.checkNbsp(last,()=>valueHelper++);
               for(let i = 0; i <valueHelper;i++){
                  this.input.value+=" "
               }
            }else{
               this.input.value+=' ';
               this.stopPrinting.call(this,last)
            }
         }
      })
   }
   timerStart(){
      this.interval = setInterval(()=>{
         this.time++
         const result = Math.round(this.input.value.length/this.time * 60)
         if(Number.isInteger(result)){
            this.timer.innerHTML = result
         }
         this.time = this.time;
         this.result = result
      },1000)
   }
   timerStop(){
      console.log('f');
      clearInterval(this.interval)
      this.time = 0;
      this.interval = false
   }
   saveBestResult(){
      if(!this.bestResult || this.result > this.bestResult){
         this.bestResult = this.result;
         if(localStorage.getItem('result')){
            let json = localStorage.getItem('result')
            const ar = JSON.parse(json);
            const check = ar.findIndex((el)=>{
               return el.name === this.name
            })
            if(check>=0){
               ar[check].bestResult = this.bestResult
            }else{
               ar.push({name:this.name,bestResult:this.bestResult});
            }
            json = JSON.stringify(ar);
            localStorage.setItem('result',json)
         }else{
            const ar = [];
            ar.push({name:this.name,bestResult:this.bestResult})
            const json = JSON.stringify(ar);
            localStorage.setItem('result',json)
         }
      }
   }
   renew(){
      if (this.interval){
         this.timerStop()
      };
      this.onPause = false
      this.input.value = null
      const print = Array.from(document.querySelectorAll("[data-index]"))
      for(let i = print.length-2;i>=-1;i--){
         this.deleteLetters(i);
      }  
      this.timer.innerHTML= null
   }
   pause(){
      if(!this.onPause){
         this.onPause = true;
         this.currentValue = this.input.value;
         clearInterval(this.interval)
         this.interval = false
      }else{
         this.onPause = false;
         this.input.value = this.currentValue
         this.timerStart()
      }
   }
   stopPrinting(last){
      const el = document.querySelector(`[data-index="${last}"]`)
      el.classList.remove('animation')
      el.classList.add('bad');
      el.classList.remove('good');
      this.isBadLetter = true
   }
   deleteLetters(last){
      const el = document.querySelector(`[data-index="${last+1}"]`)
      const nextEll = document.querySelector(`[data-index="${last+2}"]`)
      this.isBadLetter = false;
      el.classList.remove('bad');
      el.classList.remove('good');
      el.classList.add('animation');
      nextEll?.classList?.remove('animation')
   }
   printingLetters(last){
      const el = document.querySelector(`[data-index="${last}"]`)
      const nextEl = document.querySelector(`[data-index="${last+1}"]`)
      el.classList.add('good');
      el.classList.remove('bad');
      el.classList.remove('animation')
      nextEl?.classList?.add('animation')
   }
   checkNbsp(i,foo){
      const currentElement = document.querySelector(`[data-index="${i}"]`);
      if(currentElement?.innerHTML === '&nbsp;'){
         this.printingLetters(i);
         foo();
         this.checkNbsp(i+1,foo);
      }
   }
   getLocalStorage(){
      if(!localStorage.getItem('result')) return 0;
      const json = localStorage.getItem('result');
      const ar =  JSON.parse(json);
      const check = ar.findIndex((el)=>{
         return el.name === this.name
      })
      if(check>=0){
         return ar[check].bestResult
      }else{
         return 0
      }
   }
}

export default Task;