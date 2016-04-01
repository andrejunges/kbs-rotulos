import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import PageHeader from './PageHeader'

export default class RotuloModelo2 extends Component {

    render() {

        return (
            <div>
                <PageHeader title='Rotulo Modelo 2' />
                <div style={componentStyles.body}>
                    
                </div>
            </div>
        )
    }
}


const componentStyles = {
    body: {
        padding: '0 60px 40px 60px'
    },
}