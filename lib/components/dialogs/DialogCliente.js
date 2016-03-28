import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components

//Material Components
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import Toggle from 'material-ui/lib/toggle'
//Theme
import materialBaseTheme from '../../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)


const DialogCliente = (props, context) => {

    const actions = [
        <FlatButton
            label='Cancelar'
            style={componentStyles.actionButtons}
            primary={true}
            onTouchTap={props.onRequestClose}
            />,
        <RaisedButton
            label='Salvar'
            style={componentStyles.actionButtons}
            primary={true}
            onTouchTap={props.salvarCliente}
            />,
    ];

    return (
        <Dialog
            title='Cadastro Cliente'
            contentStyle={{width: '500px'}}
            actions={actions}
            modal={true}
            open={props.open}
            onRequestClose={props.onRequestClose}>

            <div>
                <TextField
                    floatingLabelText='Nome' 
                    fullWidth={true}
                    onChange={props.handleInputChange.bind(null, 'nome')}
                    value={props.cliente.nome} />

                <TextField
                    floatingLabelText='Endereço (Rua, Número)' 
                    fullWidth={true}
                    onChange={props.handleInputChange.bind(null, 'endereco')}
                    value={props.cliente.endereco} />

                <TextField
                    floatingLabelText='Cep / Cidade' 
                    fullWidth={true}
                    onChange={props.handleInputChange.bind(null, 'cidade')}
                    value={props.cliente.cidade} />

                <TextField
                    floatingLabelText='País'
                    fullWidth={true}
                    onChange={props.handleInputChange.bind(null, 'pais')}
                    value={props.cliente.pais} />

                <TextField
                    floatingLabelText='Pares por caixa'
                    onChange={props.handleInputChange.bind(null, 'paresCaixa')}
                    value={props.cliente.paresCaixa} />

                <Toggle
                    style={{marginTop: '20px'}}
                    label='Permite misturar números'
                    labelPosition='right'
                    onToggle={props.handleInputChange.bind(null, 'misturarNumeros')}
                    toggled={props.cliente.misturarNumeros}
                    />
            </div>
        </Dialog>
    )
}

DialogCliente.PropTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    cliente: PropTypes.object,
    handleInputChange: PropTypes.func.isRequired,
    salvarCliente: PropTypes.func.isRequired,
}

export default DialogCliente;

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
    },
    actionButtons: {
        verticalAlign: 'middle',
        marginLeft: '5px'
    },
}