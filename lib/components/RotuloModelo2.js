import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import PageHeader from './PageHeader'
import SelectorCliente from './SelectorCliente'
import GradeCapacidade from './GradeCapacidade'
import PedidoForm from './PedidoForm'
import Template2 from './templates/Template2'
import DialogRevision from './dialogs/DialogRevision'
//Material Components
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Popover from 'material-ui/lib/popover/popover'
import IconButton from 'material-ui/lib/icon-button'
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
            rangeInicio: 35,
            rangeFim: 50,
            rangeCapacidade: {},
            rangeQuantidade: {},
            clientes: [],
            pedidos: [],
            pedidosCaixas: [],
            _pedidosCaixas: [],
            selectedCliente: '0',
            isRevisionDialogOpen: false,
            selectedPedido: null,
            isPedidoPopoverOpen: false,
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

    handlePedidoRangeCapacidadeChange(nro, event) {
        const rangeCapacidade = Object.assign({}, this.state.selectedPedido.rangeCapacidade);
        let i = 0;

        while(nro + i <= this.state.rangeFim) {
            rangeCapacidade[nro + i] = event.target.value.replace(nonNumericRegex, '')
            i++
        }
        this.setState({
            pedidos: this.state.pedidos.map((pedido) => {
                return pedido.key === this.state.selectedPedido.key ?
                    Object.assign({}, pedido, { rangeCapacidade: rangeCapacidade }) : pedido
            }),
            selectedPedido: Object.assign({}, this.state.selectedPedido, {
                rangeCapacidade: rangeCapacidade
            })
        })
    }

    onChangeQuantidadeCaixa(pedido, caixa, nro, event) {
        this.setState({
            pedidosCaixas: this.state.pedidosCaixas.map((pedCaixa) => {
                return pedCaixa.pedido.key === pedido.key ? Object.assign({}, pedCaixa, {
                    caixas: pedCaixa.caixas.map((c) => {
                        return caixa.id === c.id ? Object.assign({}, c, {
                            [nro]: event.target.value
                        }) : c
                    })
                }) : pedCaixa
            })
        })
    }

    onOpenPopover(pedido, event) {
        this.setState({
            isPedidoPopoverOpen: true,
            selectedPedido: pedido,
            anchorEl: event.target,
        })
    }

    closePopover() { 
        this.setState({ 
            isPedidoPopoverOpen: false, 
            selectedPedido: null,
            anchorEl: null,
        }) 
    }

    onRemoveCaixa(pedido, caixa) {
        this.setState({
            pedidosCaixas: this.state.pedidosCaixas.map((pedCaixa) => {
                return pedCaixa.pedido.key === pedido.key ? Object.assign({}, pedCaixa, {
                    caixas: pedCaixa.caixas.filter(x => x.id !== caixa.id)
                }) : pedCaixa
            })
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
                                style={componentStyles.smallTextInput}
                                floatingLabelText='Fatura' 
                                onChange={this.handleInputChange.bind(this, 'fatura')}
                                value={this.state.fatura} />
                        </div>
                        <div>
                            <TextField
                                style={componentStyles.textInput}
                                floatingLabelText='Description of goods' 
                                onChange={this.handleInputChange.bind(this, 'descriptionGoods')}
                                value={this.state.descriptionGoods} />
                            <TextField
                                style={componentStyles.smallTextInput}
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

                        {this.state.pedidos.map((pedido) => {
                            
                            return (
                                <PedidoForm
                                    key={pedido.key}
                                    pedido={pedido}
                                    rangeNros={rangeNros}
                                    onOpenPopover={this.onOpenPopover.bind(this, pedido)}
                                    onChangeNroQuantidade={this.handleRangeInputChange.bind(this)}
                                    onInputChange={this.handlePedidoInputChange.bind(this)}
                                    />
                            )
                        })}
                        <Popover
                            style={{boxShadow: `0 0 10px ${materialTheme.palette.primary1Color}`}}
                            open={this.state.isPedidoPopoverOpen}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.closePopover.bind(this)}
                        >
                            {this.state.selectedPedido ?
                            <div style={{width: '830px', padding: '20px', background: '#fafafa'}}>
                                <GradeCapacidade
                                    style={{display: 'inline-block'}}
                                    rangeNros={rangeNros}
                                    rangeCapacidade={this.state.selectedPedido.rangeCapacidade}
                                    handleRangeCapacidadeInputChange={this.handlePedidoRangeCapacidadeChange.bind(this)}
                                    />
                                <IconButton onTouchTap={this.closePopover.bind(this)} style={{top: '5px'}}>
                                    <FontIcon color={materialTheme.palette.primary1Color} className='material-icons'>done</FontIcon>
                                </IconButton>
                            </div>
                            : null}
                        </Popover>
                        <div>
                            <TextField 
                                hintText='+ Novo Pedido'
                                style={{width: '130px', height: '50px'}}
                                onFocus={(() => {
                                    this.setState({ pedidos: this.state.pedidos.concat([{ 
                                        key: this.state.pedidos.length,
                                        rangeCapacidade: {},
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

                    {/*<div style={{marginTop: '50px'}}>
                        <Template2 width={document.body.offsetWidth - 120} data={this.state} caixa={{}} cliente={cliente} />
                    </div>*/}
                </div>

                
                {this.state.isRevisionDialogOpen ?
                    <DialogRevision
                        open={this.state.isRevisionDialogOpen}
                        onRequestClose={() => { this.setState({ isRevisionDialogOpen: false, pedidosCaixas: [] }) }}
                        confirmarDivisao={this.printarCaixas.bind(this)}
                        onRemoveCaixa={this.onRemoveCaixa.bind(this)}
                        rangeNros={rangeNros}
                        pedidosCaixas={this.state.pedidosCaixas}
                        onChangeQuantidadeCaixa={this.onChangeQuantidadeCaixa.bind(this)}
                    />
                    : 
                    <div id='caixas-wrapper' style={{display: 'none'}}>
                        {this.state.pedidosCaixas.map((pedidoCaixa, i) => {
                            const dataObj = Object.assign({}, pedidoCaixa.pedido, {
                                rangeInicio: this.state.rangeInicio,
                                rangeFim: this.state.rangeFim,
                                descriptionGoods: this.state.descriptionGoods,
                                fatura: this.state.fatura,
                                data: this.state.data,
                            })

                            return (
                                <div key={i} className='print'>
                                    {pedidoCaixa.caixas.map((caixa, j) => {
                                        return (
                                            <Template2
                                                key={`caixa-${pedidoCaixa.pedido.key}-${j}`}
                                                width={document.body.offsetWidth}
                                                totalCaixas={this.state.totalCaixas}
                                                data={dataObj}
                                                caixa={caixa} 
                                                cliente={cliente} />
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }

    gerarRotulos() {
        const rangeCapacidade = this.state.rangeCapacidade
        const pedidosCaixas = [];
        let indice = this.state.indice
        let totalCaixas = 0
        let needRevision = false

        let cliente = {}
        if (this.state.clientes.length && this.state.selectedCliente) {
            cliente = this.state.clientes.find(x => x.key === this.state.selectedCliente)
        }

        this.state.pedidos.map((pedido) => {
            const hasOwnCapacity = Object.keys(pedido.rangeCapacidade).length > 0
            const rCapacidade = hasOwnCapacity ? pedido.rangeCapacidade : rangeCapacidade

            let caixas = labelGenerator(pedido.rangeQuantidade, rCapacidade, indice, cliente.misturarNumeros);
            let caixasComEspaco = caixas.filter(x => x.remainingSpace > 0)
            let pedidoNeedRevision = false

            if (caixasComEspaco.length > 1) {
                needRevision = true
                pedidoNeedRevision = true
                caixas = caixas.map((c) => {
                    return c.remainingSpace > 0
                        ? Object.assign({}, c, { needRevision: true })
                        : c
                })
            }

            pedidosCaixas.push({
                pedido,
                caixas,
                needRevision: pedidoNeedRevision
            })
            indice = indice + caixas.length;
            totalCaixas += caixas.length;
        })

        if (needRevision) {
            this.setState({
                pedidosCaixas: pedidosCaixas,
                totalCaixas: totalCaixas,
                isRevisionDialogOpen: true,
            })
        } else {
            this.setState({
                pedidosCaixas: pedidosCaixas,
                totalCaixas: totalCaixas,
            }, this.printarCaixas.bind(this))
        }
    }

    printarCaixas() {
        this.setState({
            isRevisionDialogOpen: false,
        })

        setTimeout(() => {
            const printContents = document.getElementById('caixas-wrapper').innerHTML;
            const w = window.open();
            w.document.write(`
                <style type="text/css" media="print">
                    @page { size: landscape; }
                    body {
                        margin: 0
                    }
                    * {
                        box-sizing: border-box;
                        -webkit-print-color-adjust:exact;
                        -webkit-filter:opacity(1);
                    }
                </style>
                <style type="text/css">
                    * {
                        box-sizing: border-box;
                    }
                </style>
            `)
            w.document.write(printContents);
            w.print();
        }, 1000)
    }
}


const componentStyles = {
    body: {
        padding: '0 20px 40px 20px'
    },
    rangeInput: {
        width: '100px',
        marginRight: '25px'
    },
    smallTextInput: {
        width: '150px',
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
    },
    buttonWrapper: {
        marginTop: '30px',
    }
}