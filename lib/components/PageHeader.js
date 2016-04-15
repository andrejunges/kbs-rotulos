import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const materialTheme = getMuiTheme(materialBaseTheme)


export default class PageHeader extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    goBack() {
        setTimeout(browserHistory.push('/'), 100)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.title !== this.props.title
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