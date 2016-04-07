import React, {PropTypes} from 'react'

export default (props) => {
    const rangeNros = [];
    // if (props.data.rangeInicio < props.data.rangeFim) {
    //     for (let i = props.data.rangeInicio; i <= props.data.rangeFim; i++) {
    //         rangeNros.push(i);
    //     }
    // }
    let qtdTotal = 0
    for (let i = 35; i <= 50; i++) {
        rangeNros.push(i);

        if (props.caixa[i])
            qtdTotal += parseInt(props.caixa[i])

    }
    const rangeKeys = Object.keys(props.data.rangeQuantidade);
    const boxWidth = 100 / rangeNros.length;
    const border = '1px solid #000'
    

    return (
        <div style={{height: '100%'}}>
            <div style={{border: '1px double #000', padding: '5px 0 0 0'}}>

                <div style={{display: 'flex', padding: '5px'}}>
                    <div style={{flex: '0 0 33%'}}>
                        <div style={{fontSize: '14px', fontWeight: 500}}>Exporter</div>
                        <div style={{fontWeight: 'bold', marginTop: '10px'}}>KBS Indústria de Calçados Ltda.</div>
                        <div>Rua Ibiruba, 576 - Vila Nova</div>
                        <div>CEP 93525-260 NOVO HAMBURGO</div>
                        <div style={{fontWeight: 'bold'}}>RS BRASIL</div>
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{fontSize: '14px', fontWeight: 500, paddingLeft: '100px'}}>Invoice</div>
                        <div style={{fontWeight: 'bold', paddingTop: '5px', paddingLeft: '100px'}}>{props.data.fatura || '041/2016'}</div>
                    </div>
                    <div style={{flex: '0 0 200px', textAlign: 'right'}}>
                        <div style={{fontSize: '14px', fontWeight: 500, paddingRight: '55px'}}>Date</div>
                        <div style={{fontSize: '14px', paddingRight: '20px', marginTop: '10px'}}>{props.data.data || '24/03/2016'}</div>
                    </div>
                </div>

                <div style={{marginTop: '30px', borderTop: border, display: 'flex', padding: '10px 5px'}}>
                    <div style={{flex: '0 0 33%'}}>
                        <div style={{fontSize: '14px', fontWeight: 500}}>Ship To</div>
                        <div style={{marginTop: '10px', fontWeight: 'bold'}}>{props.cliente.nome}</div>
                        <div>SCHAFTELAGER WERK PIRMASENS</div>
                        <div>{props.cliente.endereco}</div>
                        <div>{props.cliente.cidade}</div>
                        <div style={{fontWeight: 'bold'}}>{props.cliente.pais}</div>
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{fontSize: '14px', fontWeight: 500, paddingLeft: '100px'}}>Description of goods</div>
                        <div style={{marginTop: '10px', paddingLeft: '100px'}}>{props.data.descriptionGoods || 'shoe uppers made out of leather'}</div>
                    </div>
                </div>

                <div style={{borderTop: border, fontSize: '14px', fontWeight: 500, display: 'flex'}}>
                    <div style={{flex: `0 0 calc(${7 * boxWidth}% - ${80 * 0.4375}px)`, padding: '3px 5px'}}>Style</div>
                    <div style={{flex: `0 0 calc(${5 * boxWidth}% - ${Math.round(80 * 0.3120)}px)`, padding: '3px', borderLeft: border, textAlign: 'center'}}>Order-Nr.</div>
                    <div style={{flex: 1, padding: '3px', borderLeft: border, textAlign: 'center'}}>Barcode</div>
                </div>

                <div style={{fontSize: '24px', fontWeight: 'bold', display: 'flex', borderTop: border}}>
                    <div style={{flex: `0 0 calc(${7 * boxWidth}% - ${80 * 0.4375}px)`, padding: '10px'}}>{props.data.modelo || 'VX 453 TPU - UK U'}</div>
                    <div style={{flex: `0 0 calc(${5 * boxWidth}% - ${Math.round(80 * 0.3120)}px)`, padding: '10px', borderLeft: border, textAlign: 'center'}}>{props.data.pedido || '1512-415'}</div>
                    <div style={{flex: 1, padding: '10px', borderLeft: border, textAlign: 'center'}}></div>
                </div>

                <div style={{borderTop: border, borderLeft: '1px solid #ccc', display: 'flex', boxShadow: 'inset 0 0 0 1000px #ccc'}}>
                    <div style={{width: 'calc(100% - 80px)'}}>
                        {rangeNros.map((nro, i) => {

                            return (
                                <div key={i} style={{display: 'inline-block', fontSize: '24px', width: `${boxWidth}%`, padding: '6px', textAlign: 'center', borderRight: border}}>{nro}</div>
                            )
                        })}
                    </div>
                    <div style={{fontSize: '24px', width: '80px', padding: '6px 10px'}}>Pairs</div>
                </div>
                <div style={{borderTop: border, borderLeft: '1px solid transparent', display: 'flex'}}>
                    <div style={{width: 'calc(100% - 80px)'}}>
                        {rangeNros.map((nro, i) => {
                            const qtd = props.caixa[nro]
                            return (
                                <div key={i} style={{display: 'inline-block', textAlign: 'center', fontSize: '24px', width: `${boxWidth}%`, float: 'left', height: '48px', padding: '10px 10px', borderRight: border}}>
                                    {qtd}
                                </div>
                            )
                        })}
                    </div>
                    <div style={{fontSize: '24px', width: '80px', textAlign: 'center', padding: '10px 10px'}}>{qtdTotal}</div>
                </div>

                <div style={{borderTop: border, height: '50px'}}></div>

                <div style={{borderTop: border, display: 'flex'}}>
                    <div style={{flex: '0 0 20%', borderRight: border}}>
                        <div style={{textAlign: 'center'}}>Box-nr.</div>
                        <div style={{textAlign: 'center', fontSize: '22px', padding: '5px'}}>{props.caixa.id || 1}</div>
                    </div>
                    <div style={{flex: '0 0 20%', display: 'flex', justifyContent: 'center', borderRight: border, height: '54px'}}>
                        <span style={{alignSelf: 'flex-end', fontSize: '22px', padding: '5px 10px 5px 5px', display: 'inline-block', borderRight: border}}>{props.caixa.id || 1}</span>
                        <span style={{alignSelf: 'flex-end', fontSize: '22px', padding: '5px 5px 5px 10px', display: 'inline-block'}}>{props.totalCaixas}</span>
                    </div>
                    <div style={{flex: '0 0 20%', display: 'flex', justifyContent: 'center', borderRight: border, height: '54px'}}>
                        <div style={{fontSize: '20px', paddingBottom: '5px', alignSelf: 'flex-end'}}>14</div>
                    </div>
                    <div style={{flex: '0 0 20%', borderRight: border}}>
                        <div style={{textAlign: 'center'}}>Crossweigt KGS</div>
                        <div style={{textAlign: 'center', fontSize: '22px', padding: '5px'}}>15</div>
                    </div>
                    <div style={{flex: '0 0 20%'}}>
                        <div style={{textAlign: 'center'}}>Dimension</div>
                        <div style={{textAlign: 'center', fontSize: '18px', padding: '5px'}}>600x400x320</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
