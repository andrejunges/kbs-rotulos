import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components

//Material Components
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)


const Cliente = (props, context) => {

    return (
        <div style={componentStyles.root}>
            {props.cliente.nome}

            <div style={componentStyles.iconsWrapper}>
                <IconButton tooltip="Editar" onTouchTap={props.onEdit}>
                    <FontIcon color={materialTheme.palette.primary1Color} className="material-icons">create</FontIcon>
                </IconButton>
                <IconButton tooltip="Excluir" onTouchTap={props.onExclude}>
                    <FontIcon color={materialTheme.palette.primary1Color} className="material-icons">delete</FontIcon>
                </IconButton>
            </div>
        </div>
    )
}

Cliente.PropTypes = {
    cliente: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onExclude: PropTypes.func.isRequired,
}

export default Cliente;

const componentStyles = {
    root: {
        marginBottom: '10px',
        padding: '15px',
        boxShadow: '1px 1px 4px #ddd',
        position: 'relative'
    },
    iconsWrapper: {
        position: 'absolute',
        right: '20px',
        top: '2px'
    }
}