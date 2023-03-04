const input = document.querySelector('input')
const text = document.querySelector('.test__text')
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
function alwaysInFocus(el){
   el.focus();
   document.onclick=()=>{
      el.focus()
   }
   const firstLetter = document.querySelector('[data-index="0"]')
   firstLetter.classList.add('animation')
}

const arrayFromString = TASK_1.split('\n');
arrayFromString.forEach(function(word,i){
   const spanLine = document.createElement('span');
   spanLine.className = 'test__line'
   const arrayFromWord = Array.from(word);
   arrayFromWord.push('gap')
   arrayFromWord.forEach((letter,j)=>{
      const spanLetter = document.createElement('span');
      const currentIndex = arrayFromString.reduce((ac,el,ind)=>{
         if(ind>=i)return ac;
         return ac+el.length+1;
      },0)
      spanLetter.dataset.index = currentIndex + j
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
   text.appendChild(spanLine)
})

input.addEventListener('input',function(e){
   const last = this.value.length - 1;
   const el = document.querySelector(`[data-index="${last}"]`)
   const nextEl = document.querySelector(`[data-index="${last+1}"]`)
   const nextEll = document.querySelector(`[data-index="${last+2}"]`)
   if(!input.isBadLetter){
      if(this.value[last]){
         el.classList.remove('animation')
         if(el.classList.contains('gap')){
            el.classList.add('bad');
            input.isBadLetter = true;
         }else{
            if(this.value[last] === el?.textContent || (this.value[last] === ' ' && el?.innerHTML === "&nbsp;")){
               el.classList.add('good');
               el.classList.remove('bad');
               nextEl.classList.add('animation')
   
            }else{
               el.classList.add('bad');
               el.classList.remove('good');
               input.isBadLetter = true;
            }
         }
      }else{
         nextEl.classList.add('animation')
      }
      nextEl.classList.remove('good')
      nextEll.classList.remove('animation')
   }else{
      if(e.inputType==='deleteContentBackward'){
         input.isBadLetter = false;
         nextEl.classList.remove('bad');
         nextEl.classList.add('animation');

      }else{
         this.value = this.value.slice(0,-1);
      }
   }
})
input.addEventListener('keydown',function(e){
   if(e.key === 'Enter'){
      const last = this.value.length;
      const currentElement = document.querySelector(`[data-index = "${last}"]`)
      let valueHelper = 0
      if(currentElement.classList.contains('gap')){
         checkNbsp(last,()=>valueHelper++);
         console.log(valueHelper);
         for(let i = 0; i <valueHelper;i++){
            this.value+=" "
         }
      }
   }
})

alwaysInFocus(input)

function checkNbsp(i,acc){
   const currentElement = document.querySelector(`[data-index="${i}"]`);
   const focusElement = document.querySelector(`[data-index="${i+1}"]`);
   // const previousElement = document.querySelector(`[data-index="${i-1}"]`);
   if(currentElement.innerHTML === '&nbsp;'){
      currentElement.classList.add('good');
      focusElement.classList.add('animation')
      currentElement.classList.remove('animation')
      acc();
      checkNbsp(i+1,acc);
   }
}