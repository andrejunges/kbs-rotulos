import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

export default (props, context) => {
    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: 1, paddingLeft: '20px'}}>
                {props.rangeNros.map((nro, i) => {

                    return (
                        <TextField
                            key={i}
                            style={{width: '40px', marginRight: '5px'}}
                            floatingLabelText={nro} 
                            onChange={props.onChangeNroQuantidade.bind(null, nro)}
                            value={props.caixa[nro]} />
                    )
                })}

                <IconButton tooltip='Remover' onTouchTap={props.onRemoveCaixa}>
                    <FontIcon className='material-icons'>clear</FontIcon>
                </IconButton>
            </div>
        </div>
    )
}