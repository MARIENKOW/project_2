const base = [
   {
      complexity:3,
      name:'bubbleSort',
      task:`function bubbleSort(arr) {
   const newArr = arr.slice();
   for(let i = 0,size = newArr.length - 1; i<size; i++){
      let isArraySorted = false;
      for(let j = 0; j < size - i; j++){
         if(newArr[i] > newArr[i+1]){
            [newArr[i],newArr[i+1]] = [newArr[i+1],newArr[i]];
            isArraySorted = true;
         }
      }
      if(!isArraySorted) break
   }
   return newArr;
}`
   },
   {
      complexity:2,
      name:'User',
      task:`class User{
   constructor(name){
      this.name = name;
   }
   get name(){
      return _name;
   }
   set name(str){
      if(str.length<4) throw new Error('short name');
      this._name = str;
   }
}

const user = new User('Denis')`
   }
]

export default base.sort((a,b)=>a.complexity - b.complexity);
