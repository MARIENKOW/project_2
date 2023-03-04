
const TASK_1 =`function bubbleSort(arr) {
   for (var i = 0, endI = arr.length - 1; i < endI; i++) {
      for (var j = 0, endJ = endI - i; j < endJ; j++) {
         if (arr[j] > arr[j + 1]) {
            var swap = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = swap;
         }
      }
   }
   return arr;
}`;
const TASK_2 = `const user = new User('Denis')`

class Task{
   constructor(task){
      this.task = task;
      this.block = null
      this.input = null
      this.timer = null
      this.taskLength = 0;
      this.bestResult = 0
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
            this.taskLength = spanLetter.dataset.index = this.findCurrentIndex(arrayFromString,i,j)
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
   findCurrentIndex(array,wordIndex,letterIndex){
      const currentIndex = array.reduce((ac,el,ind)=>{
         if(ind>=wordIndex)return ac;
         return ac+el.length+1;
      },0)
      return currentIndex + letterIndex;
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
   alwaysInFocus(){
      this.input.focus();
      document.onclick=()=>{
         this.input.focus()
      }
      const firstLetter = document.querySelector('[data-index="0"]')
      firstLetter.classList.add('animation')
   }
   checkNbsp(i,foo){
      const currentElement = document.querySelector(`[data-index="${i}"]`);
      if(currentElement?.innerHTML === '&nbsp;'){
         this.printingLetters(i);
         foo();
         this.checkNbsp(i+1,foo);
      }
   }
   starToPrint(){
      this.input.addEventListener('input',(e)=>{
         if(!this.interval)this.timerStart();
         const last = this.input.value.length - 1;
         const currentElement = document.querySelector(`[data-index="${last}"]`)
         if(e.inputType==='deleteContentBackward'){
            this.deleteLetters.call(this,last)
         }else{
            if(!this.isBadLetter){
               if(currentElement.classList.contains('gap')){
                  this.stopPrinting.call(this,last);
               }else{
                  if(this.input.value[last] === currentElement?.textContent || (this.input.value[last] === ' ' && currentElement?.innerHTML === "&nbsp;")){
                     this.printingLetters(last);
                     if(last === this.taskLength-1) return this.timerStop();
                  }else{
                     this.stopPrinting.call(this,last);
                  }
               }
            }else{
               this.input.value = this.input.value.slice(0,-1);
            }
         }
      })
      this.input.addEventListener('keydown',(e)=>{
         if(e.key === 'Enter'){
            if(!this.isBadLetter){
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
         }
      })
   }
   timerStart(){
      let time = 0
      this.interval = setInterval(()=>{
         time++
         const result = this.input.value.length/this.time * 60
         console.log(result);
         if(result){
            this.timer.innerHTML = Math.round(result)
         }
         this.time = time;
         this.result = result
      },1000)
   }
   timerStop(){
      clearInterval(this.interval)
      this.interval = false
      if(!this.bestResult || this.result > this.bestResult){
         this.bestResult = this.result;
      }
      console.dir(this);
   }
   renew(){
      if (this.interval) return;
      this.input.value = null
      const print = Array.from(document.querySelectorAll("[data-index]"))
      for(let i = print.length-2;i>=-1;i--){
         console.log(i);
         this.deleteLetters(i);
      }  
      this.timer.innerHTML= null
   }
   pause(){
      this.onPause = true;
   }
}
const task = new Task(TASK_1);
task.block = document.querySelector('.test__text');
task.input = document.querySelector('input');
task.timer = document.querySelector('.test__timer')
task.printTask()
task.alwaysInFocus()
task.starToPrint();

btn.onclick=()=>{
   task.renew()
}
btn.onclick=()=>{
   task.pause()
}



