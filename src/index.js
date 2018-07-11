import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import App from 'components/App'


if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}


let routes = <Router history={createHistory()}>
  <Route path="/" component={App} />
</Router>



ReactDOM.render(routes, document.getElementById(`root`))



// open ES2015 in babel, then you don't have to re-require app root in module.hot.accept.
if (module.hot) {
  module.hot.accept('components/App', () => {
    render(App);
  });
}
