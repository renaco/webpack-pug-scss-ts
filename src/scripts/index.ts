import './../styles/main.scss';
import * as CONST from './const';

let myUrl: string = '?token=7ce167de82226';
let domain: string = `yourDomain.co`;
let showEnv: any = <HTMLSpanElement>document.querySelector('#showEnv');
let myLink: string = ` www.${domain}/${myUrl}`;

(() => {
  showEnv.innerText = `${myLink} `;
})()

console.log(' is the beginning ' + myLink, CONST.LOCAL_ENV);