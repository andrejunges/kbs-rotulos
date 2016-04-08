import React, {PropTypes, Component} from 'react'
//Material Components
import TextField from 'material-ui/lib/text-field'
//Others
//import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import deepEqual from 'deep-equal'
import pick from 'lodash/object/pick'

class PedidoFormGrade extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const propsCompared = ['pedido', 'rangeNros']
        return !deepEqual(pick(nextProps, propsCompared), pick(this.props, propsCompared))
    }

    render() {
        let total = 0;
        this.props.rangeNros.map((nro) => {
            let qtdNro = this.props.pedido.rangeQuantidade[nro] || 0
            total += parseInt(qtdNro);
        })

        return (
            <div>
                {this.props.rangeNros.map((nro, i) => {

                    return (
                        <TextField
                            key={nro}
                            style={{width: '32px', marginRight: '5px'}}
                            floatingLabelText={nro}
                            onKeyDown={(e) => { e.keyCode === 13 && this.props.onEnterKeyDown && this.props.onEnterKeyDown(e) }}
                            onChange={this.props.onChangeNroQuantidade.bind(null, nro)}
                            value={this.props.pedido.rangeQuantidade[nro]} />
                    )
                })}
                <TextField
                    style={{width: '40px', marginLeft: '10px', fontWeight: 'bold'}}
                    floatingLabelText='Total'
                    disabled={true}
                    value={total} />
            </div>
        )
    }
}

export default PedidoFormGrade