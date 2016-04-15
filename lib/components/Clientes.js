import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Componentes
import DialogCliente from './dialogs/DialogCliente'
import Cliente from './Cliente'
import PageHeader from './PageHeader'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const materialTheme = getMuiTheme(materialBaseTheme)
//Others
import Rebase from 're-base'
const base = Rebase.createClass('https://kbsrotulos.firebaseio.com');

export default class Clientes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDialogClienteOpen: false,
            clientes: [],
            cliente: {}
        }
    }

    componentDidMount(){
        this.ref = base.syncState('clientes', {
            context: this,
            state: 'clientes',
            asArray: true
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    salvarCliente() {
        const cliente = this.state.cliente;
        const isEditing = !!this.state.clientes.find(x => x.key === cliente.key);
        let clientes;

        if (isEditing) {
            clientes = this.state.clientes.map((c) => {
                return c.key === cliente.key ? cliente : c
            })
        } else {
            clientes = this.state.clientes.concat([cliente])
        }

        this.setState({
            cliente: {},
            clientes: clientes,
            isDialogClienteOpen: false,
        })
    }

    closeDialogClientes() {
        this.setState({
            cliente: {}, 
            isDialogClienteOpen: false
        })
    }

    cadatrarNovoCliente() {
        this.setState({ isDialogClienteOpen: true })
    }

    handleInputChange(fieldName, event, toogled) {
        let value = event.target.value;
        if (fieldName === 'misturarNumeros')
            value = toogled

        this.setState({
            cliente: Object.assign({}, this.state.cliente, {
                [fieldName]: value
            }),
        })
    }

    onExcludeCliente(cliente) {
        this.setState({
            clientes: this.state.clientes.filter(x => x.key !== cliente.key)
        })
    }

    onEditCliente(cliente) {
        this.setState({
            cliente: cliente,
            isDialogClienteOpen: true,
        })
    }

    render() {

        return (
            <div>
                <PageHeader title='Clientes' />
                <div style={componentStyles.body}>
                    <RaisedButton
                        label='Cadastrar Novo Cliente'
                        labelPosition='after'
                        onTouchTap={this.cadatrarNovoCliente.bind(this)}
                        icon={<FontIcon className='material-icons'>add</FontIcon>}
                        labelStyle={{color: '#FFF'}}
                        backgroundColor={materialTheme.palette.green} />

                    <div style={componentStyles.clientesWrapper}>
                        {this.state.clientes.map((cliente, i) => {

                            return (
                                <Cliente
                                    key={i}
                                    onExclude={this.onExcludeCliente.bind(this, cliente)}
                                    onEdit={this.onEditCliente.bind(this, cliente)}
                                    cliente={cliente} />
                            )
                        })}
                    </div>
                </div>

                <DialogCliente 
                    open={this.state.isDialogClienteOpen}
                    cliente={this.state.cliente}
                    salvarCliente={this.salvarCliente.bind(this)}
                    handleInputChange={this.handleInputChange.bind(this)}
                    onRequestClose={this.closeDialogClientes.bind(this)} />
            </div>
        )
    }
}

const componentStyles = {
    body: {
        padding: '20px 40px'
    },
    clientesWrapper: {
        marginTop: '40px',
    },
}