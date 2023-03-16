import base from './base.mjs'

const popap = document.querySelector('.popap')
const hash = location.hash.slice(1);
if(hash === 'back') popap.style.display = 'none'

const popapBtn = document.querySelector('.popap__btn--choose')
popapBtn.addEventListener('click',()=>{
   popap.style.display = 'none'
})

const block = document.querySelector('.main__body');
const maxComplexity = 5;

for(let i = 0; i < base.length; i++){
   const item = document.createElement('a');
   item.href = `task.html#${i}`
   item.className = 'main__item';

   const itemImg = document.createElement('img');
   itemImg.src='img/choose2.png'
   item.alt='choose'
   itemImg.style.cssText=`
   width:100%;`

   const itemInner = document.createElement('div');
   itemInner.className = 'complexity';
   itemInner.style.cssText = `
   display:flex;
   justify-content:space-between;
   margin-top:auto;
   `

   for(let j = 0; j < maxComplexity;j++){
      const gradation = document.createElement('div')
      gradation.style.cssText = `
      width:calc(20% - 4px);
      height:10px;
      border-radius:4px;
      `
      if(j<base[i].complexity){
         gradation.style.backgroundColor=colorForComplexity(j);
         gradation.style.boxShadow=`inset -1px -1px 2px #00000046,
         inset 1px 1px 2px #fff`;
      }else{
         gradation.style.border = '1px solid #cbcbcb'
      }
      itemInner.appendChild(gradation)
   }
   item.appendChild(itemImg)
   item.appendChild(itemInner)
   block.appendChild(item)
}

function colorForComplexity(number){
   if (number === 0)return '#24db00'
   if (number === 1)return '#ddff00'
   if (number === 2)return 'yellow'
   if (number === 3)return 'orange'
   if (number === 4)return 'red'
}