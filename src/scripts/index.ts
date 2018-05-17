import './../styles/main.scss';
import * as CONST from './const';

console.log('from typescript,', this)

let myUrl: string = '?token=7ce167de82226';
let domain: string = '//elrena.co';
let showEnv:any = <HTMLSpanElement>document.querySelector('#showEnv');
let myLink: string = domain + myUrl;

(() => {
  showEnv.innerText = myLink;
})()

console.log(' is the begining ' + domain + myUrl, CONST.LOCAL_ENV);