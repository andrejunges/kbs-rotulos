import React, {PropTypes, Component} from 'react'
//Internar Components
import PedidoFormGrade from './PedidoFormGrade'
//Material Components
import TextField from 'material-ui/lib/text-field'
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button'
//Theme
import materialBaseTheme from '../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)
//Others
import shallowEqual from '../utils/shallowEqual'
import deepEqual from 'deep-equal'
import pick from 'lodash/object/pick'
import omit from 'lodash/object/omit'
window.omit = omit

export default class PedidoForm extends Component {

    constructor(props) {
        super(props)

        this.onChangeNroQuantidade = this.onChangeNroQuantidade.bind(this)
    }

    componentDidMount() {
        this.refs[`pedido-${this.props.pedido.key}`].focus()
    }

    shouldComponentUpdate(nextProps, nextState) {
        const propsCompared = ['pedido', 'rangeNros', 'showGradePedido']
        return !deepEqual(pick(nextProps, propsCompared), pick(this.props, propsCompared))
    }

    onChangeNroQuantidade(nro, event) {
        this.props.onChangeNroQuantidade(nro, event)
    }

    render() {
        const firstColumnWidth = this.props.showGradePedido ? '290px' : '240px'
        const pedidoAux = omit(this.props.pedido, ['pedido', 'modelo'])

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
                    <PedidoFormGrade
                        pedido={pedidoAux}
                        rangeNros={this.props.rangeNros}
                        onEnterKeyDown={this.props.onEnterKeyDown}
                        onChangeNroQuantidade={this.onChangeNroQuantidade}
                    />
                </div>
            </div>
        )
    }
}