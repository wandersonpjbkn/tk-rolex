importScripts("/tk-rolex/precache-manifest.143b64cbd1aeb55c6d1e3fb3fdb9394c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const LATEST_VERSION = 'v1.0.1'
const precache = 'precache'
const runtime = 'runtime'
const prefix = 'tk-rolex-app'
const suffix = LATEST_VERSION

const log = (message, bg, color) => {
  const colors = { dark: '#333', gray: '#ddd', red: '#f00', blue: '#00f', green: '#0f0' }
  console.info(
    `%c${message}`,
    `background: ${colors[bg || 'dark']}; color: ${colors[color || 'red']}`
  )
}

// set cache details
workbox.core.setCacheNameDetails({ prefix, suffix, precache, runtime })

// return for all navigation requests
workbox.routing.registerNavigationRoute('/index.html')

// skip waiting
workbox.core.skipWaiting()
workbox.core.clientsClaim()

// cache routes
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// clean old caches
workbox.precaching.cleanupOutdatedCaches()

// print version on the screen
self.addEventListener('activate', () => {
  log(` Latest version: ${LATEST_VERSION} `, 'gray', 'blue')

  if (caches) {
    caches
      .keys()
      .then((arr) => {
        arr.forEach(key => {
          const versionName = `tk-rolex-app-precache-${LATEST_VERSION}`
          const versionFound = ~key.indexOf(versionName)

          switch (versionFound) {
            case true:
              caches
                .delete(key)
                .then(() => log(` Cleared ${key} `))
              break

            default:
              caches
                .open(key)
                .then(cache => {
                  cache
                    .match('version')
                    .then(async response => {
                      const status = 200
                      const statusText = LATEST_VERSION

                      if (!response) return cache.put('version', new Response(LATEST_VERSION, { status, statusText }))

                      if (response.statusText !== LATEST_VERSION) return caches.delete(key).then(() => log(` Cleared Cache ${LATEST_VERSION} `))

                      log(` Great you have the latest version ${LATEST_VERSION} `, '', 'green')
                    })
                })
              break
          }
        })
      })
  }
})

