import React, {Component} from 'react'
//import Perf from 'react-addons-perf'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './components/App'
import Rotulos from './components/Rotulos'
import RotuloModelo1 from './components/RotuloModelo1'
import RotuloModelo2 from './components/RotuloModelo2'
import Clientes from './components/Clientes'

//window.Perf = Perf

export default class Root extends Component {

    render() {

        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Rotulos}/>
                        <Route path="rotulo1" component={RotuloModelo1} />
                        <Route path="rotulo2" component={RotuloModelo2} />
                        <Route path="clientes" component={Clientes} />
                    </Route>
                </Router>
            </div>
        )
    }
}

