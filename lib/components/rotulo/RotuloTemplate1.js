import React, {PropTypes} from 'react'

export default (props) => {
    const rangeNros = [];
    if (props.data.rangeInicio < props.data.rangeFim) {
        for (let i = props.data.rangeInicio; i <= props.data.rangeFim; i++) {
            rangeNros.push(i);
        }
    }
    const rangeKeys = Object.keys(props.data.rangeQuantidade);

    return (
        <div style={{border: '1px solid #000', padding: '20px 0 0 0'}}>
            <div style={{display: 'flex'}}>
                <div style={{flex: '0 0 50%'}}>
                    <div style={{padding: '5px'}}>{props.cliente.nome}</div>
                    <div style={{padding: '5px'}}>{props.cliente.endereco}</div>
                    <div style={{padding: '5px'}}>{props.cliente.cidade}</div>
                    <div style={{padding: '5px'}}>{props.cliente.pais}</div>
                </div>
                <div style={{flex: '0 0 50%', textAlign: 'right', padding: '20px', fontSize: '24px'}}>
                    Nr. <span style={{padding: '8px 25px', border: '1px solid #000'}}>001</span>  
                </div>
            </div>
            <div style={{borderTop: '1px solid #000', display: 'flex'}}>
                <div style={{flex: 1, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center'}}>AUFTRAG</div>
                <div style={{flex: 2, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', fontWeight: 'bolder'}}>ARTIKEL</div>
                {rangeNros.map((nro, i) => {
                    const borderRight = i < rangeNros.length - 1 ? '1px solid #000' : 'none'

                    return (
                        <div key={i} style={{fontSize: '24px', width: '50px', padding: '6px 10px', borderRight: borderRight}}>{nro}</div>
                    )
                })}
            </div>
            <div style={{borderTop: '1px solid #000', display: 'flex'}}>
                <div style={{flex: 1, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center'}}>{props.data.pedido}</div>
                <div style={{flex: 2, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', fontWeight: 'bolder'}}>{props.data.modelo}</div>
                {rangeNros.map((nro, i) => {
                    const qtd = props.data.rangeQuantidade[nro]
                    const borderRight = i < rangeNros.length - 1 ? '1px solid #000' : 'none'
                    return (
                        <div key={i} style={{fontSize: '24px', width: '50px', padding: '6px 10px', borderRight: borderRight}}>{qtd}</div>
                    )
                })}
            </div>
        </div>
    )
}