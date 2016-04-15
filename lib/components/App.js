import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const materialTheme = getMuiTheme(materialBaseTheme)

export default class App extends Component {

    render() {

        return (
            <MuiThemeProvider muiTheme={materialTheme}>
                <div style={componentStyles.root}>
                    <div style={componentStyles.header}>
                        <h1>KBS Rótulos</h1>
                        <div style={componentStyles.headerButton}>
                            <RaisedButton 
                                label='Meus Clientes'
                                onTouchTap={() => { browserHistory.push('/clientes') }}
                                labelStyle={{color: materialTheme.palette.primary1Color}}
                                backgroundColor='#FFF' />
                        </div>
                    </div>
                    <div style={componentStyles.body}>
                        <div style={componentStyles.rootBody}>
                            {this.props.children}
                        </div>
                    </div>
                    <div style={componentStyles.footer}>
                        Copyrights - André Junges | 2016
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

const componentStyles = {
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flex: '0 0 90px',
        alignItems: 'center',
        paddingLeft: '40px',
        position: 'relative',
        background: materialTheme.palette.primary1Color,
        color: materialTheme.palette.accent1Color
    },
    headerButton: {
        position: 'absolute',
        right:  '50px',
        bottom: '25px'
    },
    body: {
        flex: 1,
        position: 'relative',
        overflow: 'auto'
    },
    footer: {
        flex: '0 0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        background: '#333',
        color: '#FFF',
        textAlign: 'center'
    }
}