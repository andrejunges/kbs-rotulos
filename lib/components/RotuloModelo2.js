import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import PageHeader from './PageHeader'
import SelectorCliente from './SelectorCliente'
import GradeCapacidade from './GradeCapacidade'
import Template2 from './templates/Template2'
//Material Components
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)
//Others
import labelGenerator from '../utils/labelGenerator'
import Rebase from 're-base'

const base = Rebase.createClass('https://kbsrotulos.firebaseio.com');
const nonNumericRegex = /[^0-9.]+/g;


export default class RotuloModelo2 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            indice: 1,
            rangeInicio: 36,
            rangeFim: 47,
            rangeCapacidade: {},
            rangeQuantidade: {},
            clientes: [],
            pedidos: [],
            pedidosCaixas: []
        }
    }

    componentDidMount(){
        this.ref = base.bindToState('clientes', {
            context: this,
            state: 'clientes',
            asArray: true
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    handleInputChange(fieldName, event) {
        this.setState({
            [fieldName]: event.target.value
        })
    }

    handlePedidoInputChange(fieldName, pedido, event) {
        this.setState({
            pedidos: this.state.pedidos.map((p) => {
                return pedido.key === p.key ? Object.assign({}, pedido, {
                    [fieldName]: event.target.value
                }) : p;
            })
        })
    }

    handleRangeInputChange(nro, pedido, event) {
        this.setState({
            pedidos: this.state.pedidos.map((p) => {
                return p.key === pedido.key ? Object.assign({}, pedido, {
                    rangeQuantidade: Object.assign({}, pedido.rangeQuantidade, {
                        [nro]: event.target.value.replace(nonNumericRegex, '')
                    })
                }) : p;
            })
        })
    }

    handleRangeCapacidadeInputChange(nro, event) {
        const rangeCapacidade = Object.assign({}, this.state.rangeCapacidade);
        let i = 0;

        while(nro + i <= this.state.rangeFim) {
            rangeCapacidade[nro + i] = event.target.value.replace(nonNumericRegex, '')
            i++
        }
        this.setState({
            rangeCapacidade: rangeCapacidade
        })
    }

    render() {
        const rangeNros = [];
        if (this.state.rangeInicio < this.state.rangeFim) {
            for (let i = this.state.rangeInicio; i <= this.state.rangeFim; i++) {
                rangeNros.push(i);
            }
        }
        let cliente = {}
        if (this.state.clientes.length && this.state.selectedCliente) {
            cliente = this.state.clientes.find(x => x.key === this.state.selectedCliente)
        }

        return (
            <div>
                <PageHeader title='Rotulo Modelo 2' />
                <div style={componentStyles.body}>
                    <div>
                        <div style={{height: '70px'}}>
                            <SelectorCliente
                                clientes={this.state.clientes}
                                selectedCliente={this.state.selectedCliente}
                                onChange={(event, index, value) => { this.setState({ selectedCliente: value }) }}
                            />
                        </div>

                        <div>
                            <TextField
                                style={componentStyles.rangeInput}
                                floatingLabelText='Range Inicial' 
                                onChange={this.handleInputChange.bind(this, 'rangeInicio')}
                                value={this.state.rangeInicio} />
                            <TextField
                                style={componentStyles.rangeInput}
                                floatingLabelText='Range Final' 
                                onChange={this.handleInputChange.bind(this, 'rangeFim')}
                                value={this.state.rangeFim} />
                            <TextField
                                style={componentStyles.rangeInput}
                                floatingLabelText='Índice inicial' 
                                onChange={this.handleInputChange.bind(this, 'indice')}
                                value={this.state.indice} />
                            <TextField
                                style={componentStyles.rangeInput}
                                floatingLabelText='Num/Ano' 
                                onChange={this.handleInputChange.bind(this, 'nroAno')}
                                value={this.state.nroAno} />
                        </div>
                        <div>
                            <TextField
                                style={componentStyles.textInput}
                                floatingLabelText='Description of goods' 
                                onChange={this.handleInputChange.bind(this, 'descriptionGoods')}
                                value={this.state.descriptionGoods} />
                            <TextField
                                style={componentStyles.rangeInput}
                                floatingLabelText='Data' 
                                onChange={this.handleInputChange.bind(this, 'data')}
                                value={this.state.data} />
                        </div>

                        <div style={componentStyles.gradeContainer}>
                            <GradeCapacidade
                                rangeNros={rangeNros}
                                rangeCapacidade={this.state.rangeCapacidade}
                                handleRangeCapacidadeInputChange={this.handleRangeCapacidadeInputChange.bind(this)}
                                />
                        </div>
                    </div>

                    <div style={{marginTop: '50px'}}>
                        <Template2 data={this.state} caixa={{}} cliente={cliente} />
                    </div>
                </div>
            </div>
        )
    }
}


const componentStyles = {
    body: {
        padding: '0 60px 40px 60px'
    },
    rangeInput: {
        width: '100px',
        marginRight: '25px'
    },
    textInput: {
        width: '350px',
        marginRight: '25px'
    },
    nroInput: {
        width: '40px',
        marginRight: '5px'
    },
    gradeContainer: {
        marginTop: '20px'
    }
}