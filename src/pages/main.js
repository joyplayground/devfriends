import './index.css';
import { formatter } from '@common/date';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('hahaha hehe', formatter(new Date()));

let div = document.createElement('div');
div.innerHTML = 'hello world kdfjafj';

document.body.append(div);
