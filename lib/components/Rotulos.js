import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components

//Material Components
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';
import RaisedButton from 'material-ui/lib/raised-button';

//Theme
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import materialBaseTheme from '../utils/materialTheme'
const materialTheme = getMuiTheme(materialBaseTheme)

export default class Rotulos extends Component {

    openRotulo1() {
        browserHistory.push('/rotulo1')
    }

    openRotulo2() {
        browserHistory.push('/rotulo2')
    }

    render() {

        const template1Img = require('../../assets/images/template-1.png')
        const template2Img = require('../../assets/images/template-2.png')

        return (
            <div style={componentStyles.root}>
                <Card style={componentStyles.card}>
                    <CardHeader title='Rótulo 1' subtitle='Modelo 1' style={componentStyles.cardHeader} />

                    <CardMedia>
                        <img src={template1Img} alt='Template 1' />
                    </CardMedia>
                    <CardActions>
                        <RaisedButton label='Abrir' primary={true} onTouchTap={this.openRotulo1.bind(this)} />
                    </CardActions>
                </Card>

                <Card style={componentStyles.card}>
                    <CardHeader title='Rótulo 2' subtitle='Modelo 2' style={componentStyles.cardHeader} />
                    <CardMedia>
                        <img src={template2Img} style={{width: '270px', minWidth: '200px'}} alt='Template 2' />
                    </CardMedia>
                    <CardActions>
                        <RaisedButton label='Abrir' primary={true} onTouchTap={this.openRotulo2.bind(this)} />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const componentStyles = {
    root: {
        display: 'flex',
        padding: '40px'
    },
    card: {
        flex: '0 0 calc(50% - 20px)',
        marginRight: '40px',
    },
    cardHeader: {
        background: materialTheme.palette.primary2Color,
    }
}