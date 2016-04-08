import React, {PropTypes, Component} from 'react'
//Material Components
import TextField from 'material-ui/lib/text-field'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)

export default class PedidoForm extends Component {

    componentDidMount() {
        this.refs[`pedido-${this.props.pedido.key}`].focus()
    }

    render() {
        let total = 0;
        this.props.rangeNros.map((nro) => {
            let qtdNro = this.props.pedido.rangeQuantidade[nro] || 0
            total += parseInt(qtdNro);
        })
        const firstColumnWidth = this.props.showGradePedido ? '290px' : '240px'

        return (
            <div style={{display: 'flex'}}>
                <div style={{flex: `0 0 ${firstColumnWidth}`}}>
                    {this.props.showGradePedido ?
                    <IconButton tooltip='Grade Pedido' onTouchTap={this.props.onOpenPopover} style={{top: '5px'}}>
                        <FontIcon color={materialTheme.palette.primary1Color} className='material-icons'>grid_on</FontIcon>
                    </IconButton>
                    : null}
                    <TextField
                        ref={`pedido-${this.props.pedido.key}`}
                        floatingLabelText='Pedido'
                        style={{width: '120px'}}
                        disabled={this.props.disableInputField}
                        onChange={this.props.onInputChange.bind(null, 'pedido', this.props.pedido)}
                        value={this.props.pedido.pedido} />

                    <TextField 
                        floatingLabelText='Modelo'
                        style={{width: '100px', marginLeft: '20px'}}
                        disabled={this.props.disableInputField}
                        onChange={this.props.onInputChange.bind(null, 'modelo', this.props.pedido)}
                        value={this.props.pedido.modelo} />
                </div>

                <div style={{flex: 1, paddingLeft: '15px'}}>
                    {this.props.rangeNros.map((nro, i) => {

                        return (
                            <TextField
                                key={i}
                                style={{width: '32px', marginRight: '5px'}}
                                floatingLabelText={nro} 
                                onChange={this.props.onChangeNroQuantidade.bind(null, nro, this.props.pedido)}
                                value={this.props.pedido.rangeQuantidade[nro]} />
                        )
                    })}
                    <TextField
                        style={{width: '40px', marginLeft: '10px', fontWeight: 'bold'}}
                        floatingLabelText='Total'
                        disabled={true}
                        value={total} />
                </div>
            </div>
        )
    }
}