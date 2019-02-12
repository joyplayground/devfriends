import './index.css';
import { formatter } from '@common/date';
import '@common/sw-setup';

console.log('hahaha hehe', formatter(new Date()));

let div = document.createElement('div');
div.innerHTML = `
<div>
    <a href="/pages/home/index.html">Home 123456789</a>
</div>
<div>
    <a href="/pages/list/index.html">List Link</a>
</div>`;

document.body.append(div);
