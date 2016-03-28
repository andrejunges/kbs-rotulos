import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components

//Material Components
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)


export default class PageHeader extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    goBack() {
        setTimeout(browserHistory.goBack, 100)
    }

    render() {

        return (
            <div style={componentStyles.root}>
                <IconButton tooltip="Voltar" style={componentStyles.iconButton} onTouchTap={this.goBack.bind(this)}>
                    <FontIcon color={materialTheme.palette.primary1Color} className="material-icons">keyboard_backspace</FontIcon>
                </IconButton>
                <div style={componentStyles.text}>
                    {this.props.title}
                </div>
            </div>
        )
    }
}

const componentStyles = {
    root: {
        padding: '10px',
    },
    iconButton: {
        verticalAlign: 'middle',
    },
    text: {
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: '26px',
        fontWeight: 200,
    }
}