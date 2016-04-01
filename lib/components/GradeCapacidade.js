import React from 'react'
//Material Components
import TextField from 'material-ui/lib/text-field'

export default (props) => {

    return (
        <div>
            <div style={componentStyles.title}>Capacidade por caixa: </div>
            <div style={componentStyles.rangeInputWrapper}>
                {props.rangeNros.map((nro, i) => {
                    return (
                        <TextField
                            key={i}
                            style={componentStyles.nroInput}
                            floatingLabelText={nro}
                            onChange={props.handleRangeCapacidadeInputChange.bind(null, nro)}
                            value={props.rangeCapacidade[nro]} />
                    )
                })}
            </div>
        </div>
    )
}

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