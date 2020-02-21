import './../styles/main.scss';
import * as CONST from './const';
let myUrl: string = '?token_key=mJ6psqPVh52WkuUwiTKoGwtt';
let domain: string = `dev.golazzos.com`;
let showEnv: any = <HTMLSpanElement>document.querySelector('#showEnv');
let myLink: string = ` www.${domain}/${myUrl}`;
const myIframe  = <HTMLIFrameElement>document.getElementById('iframeContainer');
const toUpdateHeightIframe = CONST.getHeight;

console.log('Is the beginning ');
