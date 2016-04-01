import React from 'react'
//Material Components
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

export default (props) => {


    return (
        <SelectField
            style={{maxWidth: '500px', marginTop: '24px'}}
            hintText='Selecione um Cliente'
            autoWidth={true}
            fullWidth={true}
            onChange={props.onChange}
            value={props.selectedCliente} >

            {props.clientes.map((cliente) => {

                return (
                    <MenuItem key={cliente.key} value={cliente.key} label={cliente.nome} primaryText={cliente.nome} />
                )
            })}
        </SelectField>
    )
}