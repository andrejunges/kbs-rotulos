import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
import KBSRaisedButton from '../KBSRaisedButton'
//import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
//Theme
import materialBaseTheme from '../../utils/materialTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const materialTheme = getMuiTheme(materialBaseTheme)


const DialogCliente = (props, context) => {

    const actions = [
        <FlatButton
            label='Cancelar'
            style={componentStyles.actionButtons}
            primary={true}
            onTouchTap={props.onRequestClose}
            />,
        <KBSRaisedButton
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