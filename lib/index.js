import  '../assets/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(<Root />, document.getElementById('root'))

