// import * as Sentry from '@sentry/browser';

function init(){
    // Sentry.init({dsn: "https://e91f96a8687544e1a3c3ae85c3deb330@sentry.io/1797720"});
}

function log(error) {
    console.log(error);
    // Sentry.captureMessage('Logging the error', error );
}
export default {
    init,
    log
}