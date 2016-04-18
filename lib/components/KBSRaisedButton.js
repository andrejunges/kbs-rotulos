import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import materialBaseTheme from '../utils/materialTheme'
const materialTheme = getMuiTheme(materialBaseTheme)


export default (props) => {

    const {
        primary,
        secondary, 
        backgroundColor,
        labelColor,
        style,
        ...rest
    } = props;

    const bgColor = 
        backgroundColor ? backgroundColor :
        primary ? materialTheme.palette.primary1Color :
        secondary ? materialTheme.palette.primary2Color :
        undefined;

    const buttonStyle = Object.assign({}, style, {
        backgroundColor: bgColor,

    })
    const labelStyle = {
        color: labelColor || '#FFF'
    }

    return (
        <RaisedButton {...rest} 
            style={buttonStyle}
            labelStyle={labelStyle}
            backgroundColor={bgColor} />
    )
}