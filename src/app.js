const ga = require('./ga.js');
let EVENTS = require('./ga.js').EVENTS;

const log = console.log;

window.EVENTS = EVENTS;

EVENTS = JSON.parse(JSON.stringify(EVENTS));

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
}

const getCookie = (name) => {
  let re = new RegExp(`${name}=([^;]*)`);
  return document.cookie.match(re) ? document.cookie.match(re)[1] : '';
}

window.showPrompt = getCookie('showPrompt') === 'false' ? false : true;

const clearCookies = (e) => {
  // function clearCookies() {
  log(`clearCookies()`);
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const trackConversion = (e) => {
  log(`trackConversion()`);
  ga.sendEvent(EVENTS.CONVERSIONS.purchase);
  ga.trackConversion();
}

const showA2HSPrompt = (e) => {
  log(`showA2HSPrompt()`);

  ga.sendEvent(EVENTS.A2HS.custom.accepted);
  // hide our user interface that shows our A2HS button
  buttons.showA2HSPrompt.style.display = 'none';

  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        ga.sendEvent(EVENTS.A2HS.OS.accepted);
      } else {
        console.log('User dismissed the A2HS prompt');
        ga.sendEvent(EVENTS.A2HS.OS.dismissed);
      }
      deferredPrompt = null;
      setCookie('showPrompt', 'false');

    });
}

let buttons = {};
buttons.clearCookies = document.getElementById('clearCookies');
buttons.showA2HSPrompt = document.getElementById('showA2HSPrompt');
buttons.trackConversion = document.getElementById('trackConversion');

buttons.clearCookies.addEventListener('click', clearCookies);
buttons.showA2HSPrompt.addEventListener('click', showA2HSPrompt);
buttons.trackConversion.addEventListener('click', trackConversion);

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  log(`beforeinstallprompt`);
  if (window.showPrompt) {
    ga.sendEvent(EVENTS.A2HS.custom.shown);
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    // showInstallPromotion();
    buttons.showA2HSPrompt.style.visibility = 'unset';
  }

});

window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs installed');
  ga.sendEvent(EVENTS.A2HS.install);
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('display-mode is standalone');
  ga.sendEvent(EVENTS.A2HS.launchedFromHS);
}