import React, {PropTypes, Component} from 'react'
//Others

class RevisionInfo extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {

        return (
            <div>
                <div>
                    <span>Num / </span>
                    <span>Qtd / </span>
                    <span>Capacidade</span>
                </div>
                {this.props.rangeNros.map((nro, j) => {
                    const caixasWithValue = this.props.pedidoCaixa.caixas.filter(x => x.needRevision === true && x[nro] > 0)

                    return caixasWithValue.length ? (
                        <div key={j}>
                            {caixasWithValue.map((caixa, k) => {
                                return (
                                    <div key={k}>
                                        <span style={{fontWeight: 'bold'}}>{nro}</span>
                                        <span style={{paddingLeft: '22px'}}> {caixa[nro]}</span>
                                        <span style={{paddingLeft: '16px', fontSize: '13px'}}> ({caixa.capacidade})</span>
                                    </div>
                                )
                            })}
                        </div> ) : null
                })}
            </div>
        )
    }
}

export default RevisionInfo