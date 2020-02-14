import './../styles/main.scss';
import * as CONST from './const';
let myUrl: string = '?token_key=mJ6psqPVh52WkuUwiTKoGwtt';
let domain: string = `dev.golazzos.com`;
let showEnv: any = <HTMLSpanElement>document.querySelector('#showEnv');
let myLink: string = ` www.${domain}/${myUrl}`;

(() => {
  showEnv.innerText = `${myLink} `;
})()

console.log(' is the beginning ' + myLink, CONST.LOCAL_ENV);