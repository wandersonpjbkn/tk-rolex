import { register } from 'register-service-worker'

register(`${process.env.BASE_URL}service-worker.js`, {
  ready () {
    console.info('App is being served from cache by a service worker')
  },
  cached () {
    console.info('Content has been cached for offline use')
  },
  updatefound () {
    console.info('New content is downloading')
  },
  updated () {
    console.info('New content is available! We\'ll show a refresh button for the user to click on and refresh')
    window.dispatchEvent(new CustomEvent('pwaRefreshRequest', {
      detail: { show: true }
    }))
  },
  offline () {
    console.info('No internet connection found. App is running in offline mode')
  },
  error (error) {
    console.error('Error during service worker registration: ', error)
  }
})
