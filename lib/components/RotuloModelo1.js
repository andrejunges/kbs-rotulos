import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import PageHeader from './PageHeader'
import RotuloTemplate1 from './rotulo/RotuloTemplate1'
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
import Rebase from 're-base'
const base = Rebase.createClass('https://kbsrotulos.firebaseio.com');

export default class RotuloModelo1 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clientes: [],
            pedido: 'KB 1132',
            modelo: 'R 2',
            rangeInicio: 36,
            rangeFim: 47,
            rangeCapacidade: {},
            rangeQuantidade: {},
            caixas: []
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

    handleRangeInputChange(nro, event) {
        this.setState({
            rangeQuantidade: Object.assign({}, this.state.rangeQuantidade, {
                [nro]: event.target.value
            })
        })
    }

    handleRangeCapacidadeInputChange(nro, event) {
        const rangeCapacidade = Object.assign({}, this.state.rangeCapacidade);
        let i = 0;

        while(nro + i <= this.state.rangeFim) {
            rangeCapacidade[nro + i] = event.target.value
            i++
        }
        this.setState({
            rangeCapacidade: rangeCapacidade
        })
    }

    limparQuantidades() {
        this.setState({
            rangeQuantidade: {}
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
                        <div style={componentStyles.section}>
                            <TextField 
                                floatingLabelText='Pedido' 
                                onChange={this.handleInputChange.bind(this, 'pedido')}
                                value={this.state.pedido}
                                fullWidth={true} />

                            <TextField 
                                floatingLabelText='Modelo' 
                                onChange={this.handleInputChange.bind(this, 'modelo')}
                                value={this.state.modelo}
                                fullWidth={true} />
                            
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
                            </div>
                        </div>
                        <div style={componentStyles.section}>
                            <SelectField
                                style={{marginTop: '24px'}}
                                hintText='Selecione um Cliente'
                                autoWidth={true}
                                fullWidth={true}
                                selectFieldRoot={{color: 'red'}}
                                onChange={(event, index, value) => { this.setState({ selectedCliente: value }) }}
                                value={this.state.selectedCliente} >
                                
                                {this.state.clientes.map((cliente) => {

                                    return (
                                        <MenuItem key={cliente.key} value={cliente.key} label={cliente.nome} primaryText={cliente.nome} />
                                    )
                                })}
                            </SelectField>
                            {/*<TextField 
                                floatingLabelText='Cliente' 
                                onChange={this.handleInputChange.bind(this, 'cliente')}
                                value={this.state.cliente}
                                fullWidth={true} />

                            <TextField 
                                floatingLabelText='Endereço (Rua, Número)' 
                                onChange={this.handleInputChange.bind(this, 'endereco')}
                                value={this.state.endereco}
                                fullWidth={true} />

                            <div style={componentStyles.rangeInputsWrapper}>
                                <TextField
                                    style={componentStyles.rangeInput}
                                    floatingLabelText='Cep / Cidade' 
                                    onChange={this.handleInputChange.bind(this, 'cidade')}
                                    value={this.state.cidade} />
                                <TextField
                                    style={componentStyles.rangeInput}
                                    floatingLabelText='País' 
                                    onChange={this.handleInputChange.bind(this, 'pais')}
                                    value={this.state.pais} />
                            </div>*/}
                        </div>
                    </div>
                    <div style={componentStyles.rangeWrapper}>
                        <div style={componentStyles.rangeTitle}>Capacidade por caixa: </div>
                        {rangeNros.map((nro, i) => {
                            return (
                                <TextField
                                    key={i}
                                    style={componentStyles.nroInput}
                                    floatingLabelText={nro}
                                    onChange={this.handleRangeCapacidadeInputChange.bind(this, nro)}
                                    value={this.state.rangeCapacidade[nro]} />
                            )
                        })}
                    </div>
                    <div style={componentStyles.rangeWrapper}>
                        <div style={componentStyles.rangeTitle}>Quantidade: </div>
                        {rangeNros.map((nro, i) => {

                            return (
                                <TextField
                                    key={i}
                                    style={componentStyles.nroInput}
                                    floatingLabelText={nro} 
                                    onChange={this.handleRangeInputChange.bind(this, nro)}
                                    value={this.state.rangeQuantidade[nro]} />
                            )
                        })}
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

                    <div style={componentStyles.buttonWrapper}>
                        <RotuloTemplate1 data={this.state} caixa={{}} cliente={cliente} />
                    </div>

                    <div id='teste' style={{display: 'none'}}>
                        {this.state.caixas.map((caixa, i) => {

                            return (
                                <RotuloTemplate1 key={i} data={this.state} caixa={caixa} cliente={cliente} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    gerarRotulos() {
        const caixas = []
        const rangeQuantidade = this.state.rangeQuantidade
        const rangeCapacidade = this.state.rangeCapacidade
        let remainingSpace = 0;
        let i = 1;
        for (let key in rangeQuantidade) {
            let qtd = parseInt(rangeQuantidade[key]);
            let capacidade = parseInt(rangeCapacidade[key])
            const capacidadeDiferete = caixas.length && capacidade != caixas[caixas.length - 1].capacidade;
            if (!qtd)
                continue

            while (qtd > capacidade) {

                if (remainingSpace > 0 && !capacidadeDiferete) {
                    if (qtd > remainingSpace) {
                        caixas[caixas.length - 1][key] = remainingSpace
                        qtd -= remainingSpace
                        remainingSpace = 0
                    } else {
                        caixas[caixas.length - 1][key] = qtd
                        remainingSpace -= qtd
                        qtd = 0
                    }
                } else {
                    caixas.push({ id: i++, capacidade: capacidade, [key]: capacidade })
                    qtd -= capacidade;
                }
            }

            while (qtd > 0) {
                if (remainingSpace > 0  && !capacidadeDiferete) {
                    if (qtd > remainingSpace) {
                        caixas[caixas.length - 1][key] = remainingSpace
                        qtd -= remainingSpace
                        remainingSpace = 0
                    } else {
                        caixas[caixas.length - 1][key] = qtd
                        remainingSpace -= qtd
                        qtd = 0
                    }
                } else {
                    caixas.push({ id: i++, capacidade: capacidade, [key]: qtd })
                    remainingSpace = capacidade - qtd;
                    qtd = 0
                }
            }
        }

        this.setState({caixas: caixas})
        var printContents = document.getElementById('teste').innerHTML;

        setTimeout(() => {
            const w = window.open();
            w.document.write(`<style type="text/css" media="print">
              @page { size: landscape; }
            </style>`)
            w.document.write(printContents);
            w.print();
        }, 100)
    }
}

const componentStyles = {
    body: {
        padding: '0 60px 40px 60px'
    },
    formulario: {
        //padding: '0 60px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    section: {
        width: '45%',
    },
    rangeInputsWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    rangeInput: {
        width: '48%'
    },
    nroInput: {
        width: '40px',
        marginRight: '10px'
    },
    rangeWrapper: {
        marginTop: '20px',
        height: '100px',
    },
    rangeTitle: {
        
    },
    buttonWrapper: {
        marginTop: '30px',
        //padding: '0 60px'
    }
}