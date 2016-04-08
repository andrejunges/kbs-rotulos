import React, {PropTypes, Component} from 'react'
import {browserHistory} from 'react-router'
//Internal Components
import CaixaForm from '../CaixaForm'
import RevisionInfo from '../RevisionInfo'
//Material Components
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import Toggle from 'material-ui/lib/toggle'
//Theme
import materialBaseTheme from '../../utils/materialTheme'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
const materialTheme = getMuiTheme(materialBaseTheme)


const DialogRevision = (props, context) => {

    const actions = [
        <FlatButton
            key={1}
            label='Cancelar'
            style={componentStyles.actionButtons}
            primary={true}
            onTouchTap={props.onRequestClose}
            />,
        <RaisedButton
            key={2}
            label='Confirmar'
            style={componentStyles.actionButtons}
            primary={true}
            onTouchTap={props.confirmarDivisao}
            />,
    ];

    return (
        <Dialog
            title='Revisão'
            contentStyle={{width: '85vw', maxWidth: '100vw'}}
            actions={actions}
            modal={true}
            open={props.open}
            onRequestClose={props.onRequestClose}>

            <div>
                {props.pedidosCaixas.map((pedidoCaixa, i) => {
                    const marginTop = i > 0 ? '30px' : '0px'
                    const borderTop = i > 0 ? `1px solid ${materialTheme.palette.primary1Color}` : 'none'

                    if (pedidoCaixa.needRevision)
                        return (
                            <div key={i} style={{paddingTop: marginTop, marginTop: marginTop, borderTop: borderTop}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{paddingLeft: '20px'}}>
                                        <div style={{fontSize: '22px'}}>{pedidoCaixa.pedido.pedido}</div>
                                        <div style={{paddingTop: '5px', color: materialTheme.palette.primary1Color}}>{pedidoCaixa.pedido.modelo}</div>
                                    </div>
                                    <div style={{flex: 1, marginLeft: '30px', fontSize: '14px'}}>
                                        <RevisionInfo
                                            pedidoCaixa={pedidoCaixa}
                                            rangeNros={props.rangeNros}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {pedidoCaixa.caixas.filter(x => x.needRevision === true).map((caixa, j) => {
                                        return (
                                            <div key={`${pedidoCaixa.pedido.key}-${j}`}>
                                                <CaixaForm
                                                    caixa={caixa}
                                                    rangeNros={props.rangeNros}
                                                    onChangeNroQuantidade={props.onChangeQuantidadeCaixa.bind(null, pedidoCaixa.pedido, caixa)}
                                                    onRemoveCaixa={props.onRemoveCaixa.bind(null, pedidoCaixa.pedido, caixa)}
                                                    onInputChange={() => {}}
                                                    disableInputField={true}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    else 
                        return null
                })}
            </div>
        </Dialog>
    )
}

DialogRevision.PropTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    pedidosCaixas: PropTypes.array.isRequired,
    onChangeQuantidadeCaixa: PropTypes.func.isRequired,
    confirmarDivisao: PropTypes.func.isRequired,
}

export default DialogRevision;

const componentStyles = {
    root: {
        padding: '10px',
    },
    iconButton: {
        verticalAlign: 'middle',
    },
    text: {
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: '26px',
        fontWeight: 200,
    },
    actionButtons: {
        verticalAlign: 'middle',
        marginLeft: '5px'
    },
}