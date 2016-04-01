import React, {PropTypes, Component} from 'react'
//Material Components
import TextField from 'material-ui/lib/text-field'

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

        return (
            <div style={{display: 'flex'}}>
                <div style={{flex: '0 0 250px'}}>
                    <TextField
                        ref={`pedido-${this.props.pedido.key}`}
                        floatingLabelText='Pedido'
                        style={{width: '130px'}}
                        onChange={this.props.onInputChange.bind(null, 'pedido', this.props.pedido)}
                        value={this.props.pedido.pedido} />

                    <TextField 
                        floatingLabelText='Modelo'
                        style={{width: '100px', marginLeft: '20px'}}
                        onChange={this.props.onInputChange.bind(null, 'modelo', this.props.pedido)}
                        value={this.props.pedido.modelo} />
                </div>

                <div style={{flex: 1, paddingLeft: '30px'}}>
                    {this.props.rangeNros.map((nro, i) => {

                        return (
                            <TextField
                                key={i}
                                style={{width: '40px', marginRight: '5px'}}
                                floatingLabelText={nro} 
                                onChange={this.props.onChangeNroQuantidade.bind(null, nro, this.props.pedido)}
                                value={this.props.pedido.rangeQuantidade[nro]} />
                        )
                    })}
                    <TextField
                        style={{width: '40px', marginLeft: '20px', fontWeight: 'bold'}}
                        floatingLabelText='Total'
                        disabled={true}
                        value={total} />
                </div>
            </div>
        )
    }
}