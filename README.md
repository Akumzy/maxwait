# maxwait
A Node package for timing functions max execution time and timeout once the specified time is reached.
## Usage
```js
    const MaxWait = require('maxwait').defualt
    // or
    import MaxWait from 'maxwait'
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    const controller = new AbortController()
    const signal = controller.signal
    // let's create a MaxWait instance with max wait of 5000 millisecons
    const maxWait = new MaxWait(5000)
    // register a handler to be called if timeout was reached
    maxWait.onTimeout(()=>{
      controller.abort()
    })
    // start the count down
   maxWait.start()
   fetch('/some-endpoint', {
      method: 'get',
      signal: signal,
    }).then(response=>{
      // the request was successful so you need to make sure
      // you free up some memory by called the `done` method
      maxWait.done()
    }).catch(error=>{
      // also call done here too.
      maxWait.done()
    })

```