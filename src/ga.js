// const ACCOUNT_ID = '';

const EVENTS = {
  CONVERSIONS: {
    purchase: {
      action: 'purchase',
      category: 'ecommerce',
      label: '',
      interaction: true
    },
    purchase2: {
      action: 'purchaseCust',
      category: 'ecommerceCust',
      label: 'custom',
      interaction: true
    }
  },
  A2HS: {
    OS: {
      dismissed: {
        action: 'dismissed',
        category: 'a2hs',
        label: 'OS',
        interaction: true
      },
      accepted: {
        action: 'accepted',
        category: 'a2hs',
        label: 'OS',
        interaction: true
      },
      denied: {
        action: 'denied',
        category: 'a2hs',
        label: 'OS',
        interaction: true
      }
    },
    custom: {
      dismissed: {
        action: 'dismissed',
        category: 'a2hs',
        label: 'custom',
        interaction: true
      },
      accepted: {
        action: 'accepted',
        category: 'a2hs',
        label: 'custom',
        interaction: true
      },
      denied: {
        action: 'denied',
        category: 'a2hs',
        label: 'custom',
        interaction: true
      },
      shown: {
        action: 'shown',
        category: 'a2hs',
        label: 'custom',
        interaction: false
      }
    },
    install: {
      action: 'install',
      category: 'a2hs',
      label: '',
      interaction: true
    },
    launchedFromHS: {
      action: 'launched',
      category: 'a2hs',
      label: '',
      interaction: false
    }
  }
}
const log = console.log;

function trackConversion() {
  gtag('event', 'purchase', {
    "transaction_id": "24.031608523954162",
    "affiliation": "Google online store",
    "value": 23.07,
    "currency": "USD",
    "tax": 1.24,
    "shipping": 0,
    "items": [{
        "id": "P12345",
        "name": "Android Warhol T-Shirt",
        "list_name": "Search Results",
        "brand": "Google",
        "category": "Apparel/T-Shirts",
        "variant": "Black",
        "list_position": 1,
        "quantity": 2,
        "price": '2.0'
      },
      {
        "id": "P67890",
        "name": "Flame challenge TShirt",
        "list_name": "Search Results",
        "brand": "MyBrand",
        "category": "Apparel/T-Shirts",
        "variant": "Red",
        "list_position": 2,
        "quantity": 1,
        "price": '3.0'
      }
    ]
  });
}

function sendEvent(event) {
  log(`GA:sendEvent()`);
  console.log(event);
  window.gtag('event', event.action, {
    'event_category': event.category,
    'event_label': event.label
  });
}

module.exports = {
  EVENTS,
  sendEvent,
  trackConversion
};