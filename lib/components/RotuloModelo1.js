import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import PageHeader from './PageHeader'
import Template1 from './templates/Template1'
import PedidoForm from './PedidoForm'
import SelectorCliente from './SelectorCliente'
import GradeCapacidade from './GradeCapacidade'
//Material Components
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)
//Others
import labelGenerator from '../utils/labelGenerator'
import Rebase from 're-base'

const base = Rebase.createClass('https://kbsrotulos.firebaseio.com');
const nonNumericRegex = /[^0-9.]+/g;

export default class RotuloModelo1 extends Component {

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

    limparQuantidades() {
        this.setState({
            pedidos: this.state.pedidos.map((pedido) => {
                return Object.assign({}, pedido, {
                    rangeQuantidade: {}
                })
            })
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
                <PageHeader title='Rotulo Modelo 1' />
                <div style={componentStyles.body}>
                    <div style={componentStyles.formulario}>
                        <div style={{height: '70px'}}>
                            <SelectorCliente
                                clientes={this.state.clientes}
                                selectedCliente={this.state.selectedCliente}
                                onChange={(event, index, value) => { this.setState({ selectedCliente: value }) }}
                            />
                        </div>

                        <div style={componentStyles.rangeInputsWrapper}>
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
                        </div>

                        <div style={componentStyles.rangeWrapper}>
                            <GradeCapacidade
                                rangeNros={rangeNros}
                                rangeCapacidade={this.state.rangeCapacidade}
                                handleRangeCapacidadeInputChange={this.handleRangeCapacidadeInputChange.bind(this)}
                                />
                        </div>
                        
                        {this.state.pedidos.map((pedido) => {
                            
                            return (
                                <PedidoForm
                                    key={pedido.key}
                                    pedido={pedido}
                                    showGradePedido={false}
                                    rangeNros={rangeNros}
                                    onChangeNroQuantidade={this.handleRangeInputChange.bind(this)}
                                    onInputChange={this.handlePedidoInputChange.bind(this)}
                                    />
                            )
                        })}
                        <div>
                            <TextField 
                                hintText='+ Novo Pedido'
                                style={{width: '130px', height: '50px'}}
                                onFocus={(() => {
                                    this.setState({ pedidos: this.state.pedidos.concat([{ 
                                        key: this.state.pedidos.length,
                                        rangeQuantidade: {}
                                    }]) })
                                })} />
                        </div>
                    </div>
                    <div style={componentStyles.buttonWrapper}>
                        <RaisedButton
                            style={{verticalAlign: 'middle'}}
                            label='Gerar Rótulos'
                            labelPosition='after'
                            onTouchTap={this.gerarRotulos.bind(this)}
                            icon={<FontIcon className='material-icons'>print</FontIcon>}
                            primary={true} />

                        <FlatButton
                            style={{marginLeft: '10px', verticalAlign: 'middle'}}
                            label='Limpar Quantidades'
                            onTouchTap={this.limparQuantidades.bind(this)}
                            primary={true} />
                    </div>

                    {/*<div style={componentStyles.buttonWrapper}>
                        <Template1 data={this.state} caixa={{}} cliente={cliente} />
                    </div>*/}

                    <div id='caixas-wrapper' style={{display: 'none'}}>
                        {this.state.pedidosCaixas.map((pedidoCaixa, i) => {
                            const dataObj = Object.assign({}, pedidoCaixa.pedido, {
                                rangeInicio: this.state.rangeInicio,
                                rangeFim: this.state.rangeFim
                            })

                            return (
                                <div key={i} className='print'>
                                    {pedidoCaixa.caixas.map((caixa, j) => {
                                        return (
                                            <Template1
                                                key={`caixa-${pedidoCaixa.pedido.key}-${j}`}
                                                data={dataObj}
                                                caixa={caixa} 
                                                cliente={cliente} />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    gerarRotulos() {
        const rangeCapacidade = this.state.rangeCapacidade
        const pedidosCaixas = [];
        let indice = this.state.indice;

        this.state.pedidos.map((pedido) => {
            const caixas = labelGenerator(pedido.rangeQuantidade, rangeCapacidade, indice);
            pedidosCaixas.push({
                pedido,
                caixas
            })
            indice = indice + caixas.length;
        })

        this.setState({pedidosCaixas: pedidosCaixas})

        setTimeout(() => {
            const printContents = document.getElementById('caixas-wrapper').innerHTML;
            const w = window.open();
            w.document.write(`
                <style type="text/css" media="print">
                    @page { size: landscape; }
                    body {
                        margin: 0
                    }
                </style>
            `)
            w.document.write(printContents);
            w.print();
        }, 500)
    }
}

const componentStyles = {
    body: {
        padding: '0 60px 40px 60px'
    },
    formulario: {
        //padding: '0 60px',
        //display: 'flex',
        //justifyContent: 'space-between'
    },
    formularioItem: {

    },
    section: {
        width: '45%',
    },
    rangeInputsWrapper: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },
    rangeInput: {
        width: '100px',
        marginRight: '25px'
    },
    rangeWrapper: {
        marginTop: '20px',
    },
    rangeTitle: {

    },
    buttonWrapper: {
        marginTop: '30px',
        //padding: '0 60px'
    }
}
