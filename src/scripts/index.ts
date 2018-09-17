// import './../styles/main.scss';
import * as CONST from './const';
import { validateThisForm } from './validate'

// console.log('from typescript,', this)

let myUrl: string = '?token=7ce167de82226';
let domain: string = '//elrena.co';
// let showEnv:any = <HTMLSpanElement>document.querySelector('#showEnv');
// let myLink: string = domain + myUrl;

(() => {
  validateForm()
  // showEnv.innerText = myLink;
})()

function validateForm() {
  console.log('send this form');
}

// console.log(' is the begining ' + domain + myUrl, CONST.LOCAL_ENV);