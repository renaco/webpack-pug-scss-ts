import './../styles/main.scss';
import * as CONST from './const';
let myUrl: string = '?token_key=mJ6psqPVh52WkuUwiTKoGwtt';
let domain: string = `dev.golazzos.com`;
let showEnv: any = <HTMLSpanElement>document.querySelector('#showEnv');
let myLink: string = ` www.${domain}/${myUrl}`;

console.log('Is the beginning ');
