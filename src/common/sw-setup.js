function showRefreshUI(registration) {
    // TODO: Display a toast or refresh UI.

    // This demo creates and injects a button.

    var button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.bottom = '24px';
    button.style.left = '24px';
    button.textContent = 'This site has updated. Please click to see changes.';

    button.addEventListener('click', function() {
        if (!registration.waiting) {
            // Just to ensure registration.waiting is available before
            // calling postMessage()
            return;
        }

        button.disabled = true;

        registration.waiting.postMessage('skipWaiting');
    });

    document.body.appendChild(button);
}

function onNewServiceWorker(registration, callback) {
    if (registration.waiting) {
        // SW is waiting to activate. Can occur if multiple clients open and
        // one of the clients is refreshed.
        return callback();
    }

    function listenInstalledStateChange() {
        registration.installing.addEventListener('statechange', function(event) {
            if (event.target.state === 'installed') {
                // A new service worker is available, inform the user
                callback();
            }
        });
    }

    if (registration.installing) {
        return listenInstalledStateChange();
    }

    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.addEventListener('updatefound', listenInstalledStateChange);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
                if (!navigator.serviceWorker.controller) {
                    return;
                }

                var preventDevToolsReloadLoop;
                navigator.serviceWorker.addEventListener('controllerchange', function(event) {
                    if (preventDevToolsReloadLoop) return;
                    preventDevToolsReloadLoop = true;
                    window.location.reload();
                });

                onNewServiceWorker(registration, function() {
                    showRefreshUI(registration);
                });
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
