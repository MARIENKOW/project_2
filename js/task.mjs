import base from './base.mjs'
import Task from './class.mjs'

const hash =location.hash.slice(1);

const elements = {
   input:document.querySelector('input'),
   block:document.querySelector('.test__text'),
   timer:document.querySelector('.test__timer'),
   forBestResult:document.querySelector('#rez'),
}

const task = new Task(base[hash],elements);
task.printTask()
task.alwaysInFocus()
task.starToPrint();


btn.onclick=()=>{
   task.renew()
}
pause.onclick=()=>{
   task.pause()
}