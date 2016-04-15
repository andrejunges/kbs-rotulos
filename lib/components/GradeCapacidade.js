import React from 'react'
import TextField from 'material-ui/TextField';
//Others
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

const GradeCapacidade = onlyUpdateForKeys(['rangeNros', 'rangeCapacidade'])((props) => {
    const rootStyle = Object.assign({}, props.style);

    return (
        <div style={rootStyle}>
            <div style={componentStyles.title}>Capacidade por caixa: </div>
            <div style={componentStyles.rangeInputWrapper}>
                {props.rangeNros.map((nro, i) => {
                    return (
                        <TextField
                            key={i}
                            style={componentStyles.nroInput}
                            floatingLabelText={nro}
                            onKeyDown={(e) => { e.keyCode === 13 && props.onEnterKeyDown && props.onEnterKeyDown(e) }}
                            onChange={props.handleRangeCapacidadeInputChange.bind(null, nro)}
                            value={props.rangeCapacidade[nro]} />
                    )
                })}
            </div>
        </div>
    )
})

export default GradeCapacidade

const componentStyles = {
    title: {
        color: '#333'
    },
    nroInput: {
        width: '40px',
        marginRight: '5px'
    },
    rangeInputWrapper: {
        marginTop: '-10px'
    }
}