import React, {PropTypes} from 'react'

export default (props) => {
    const rangeNros = [];
    if (props.data.rangeInicio < props.data.rangeFim) {
        for (let i = props.data.rangeInicio; i <= props.data.rangeFim; i++) {
            rangeNros.push(i);
        }
    }
    const rangeKeys = Object.keys(props.data.rangeQuantidade);
    const height = props.caixa.id ? '50%' : 'auto';

    return (
        <div style={{height: height}}>
            <div style={{border: '1px solid #000', padding: '20px 0 0 0', boxSizing: 'border-box'}}>
                <div style={{display: 'flex', boxSizing: 'border-box'}}>
                    <div style={{flex: '0 0 50%', boxSizing: 'border-box'}}>
                        <div style={{padding: '5px', boxSizing: 'border-box'}}>{props.cliente.nome}</div>
                        <div style={{padding: '5px', boxSizing: 'border-box'}}>{props.cliente.endereco}</div>
                        <div style={{padding: '5px', boxSizing: 'border-box'}}>{props.cliente.cidade}</div>
                        <div style={{padding: '5px', boxSizing: 'border-box'}}>{props.cliente.pais}</div>
                    </div>
                    <div style={{flex: '0 0 50%', textAlign: 'right', padding: '20px', fontSize: '24px', boxSizing: 'border-box'}}>
                        Nr. <span style={{padding: '8px 25px', border: '1px solid #000', boxSizing: 'border-box'}}>{props.caixa.id}</span>
                    </div>
                </div>
                <div style={{borderTop: '1px solid #000', display: 'flex', boxSizing: 'border-box'}}>
                    <div style={{flex: '0 0 130px', borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', boxSizing: 'border-box'}}>AUFTRAG</div>
                    <div style={{flex: 2, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', fontWeight: 'bolder', boxSizing: 'border-box'}}>ARTIKEL</div>
                    {rangeNros.map((nro, i) => {
                        const borderRight = i < rangeNros.length - 1 ? '1px solid #000' : 'none'

                        return (
                            <div key={i} style={{fontSize: '24px', width: '50px', padding: '6px 10px', borderRight: borderRight, boxSizing: 'border-box'}}>{nro}</div>
                        )
                    })}
                </div>
                <div style={{borderTop: '1px solid #000', display: 'flex', boxSizing: 'border-box'}}>
                    <div style={{flex: '0 0 130px', borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', boxSizing: 'border-box'}}>{props.data.pedido}</div>
                    <div style={{flex: 2, borderRight: '1px solid #000', padding: '15px 5px 5px 5px', textAlign: 'center', fontWeight: 'bolder', boxSizing: 'border-box'}}>{props.data.modelo}</div>
                    {rangeNros.map((nro, i) => {
                        const qtd = props.caixa[nro]
                        const borderRight = i < rangeNros.length - 1 ? '1px solid #000' : 'none'
                        return (
                            <div key={i} style={{fontSize: '24px', width: '50px', padding: '6px 10px', borderRight: borderRight, boxSizing: 'border-box'}}>{qtd}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// var doc = new jsPDF('landscape');
// doc.setFontSize(22);
// doc.setLineWidth(.4);
// doc.line(10, 10, 285, 10);
// doc.line(10, 10, 10, 100);
// doc.line(285, 10, 285, 100);
// doc.line(10, 100, 285, 100);
// doc.setFontSize(16);
// doc.text(14, 25, 'HEIRICH KLUMPEN SOHNE GMHB & CO. KG.');
// doc.text(14, 37, 'Natt, 18');
// doc.text(14, 49, '41334 - NETTETAL');
// doc.text(14, 61, 'GERMANY');
// doc.line(10, 70, 200, 70);
// doc.text(14, 79, 'AUFTRAG');
// doc.line(45, 70, 45, 85);
// doc.text(50, 79, 'ARTIKEL');
// doc.line(85, 70, 85, 85);
// doc.line(10, 85, 200, 85);
