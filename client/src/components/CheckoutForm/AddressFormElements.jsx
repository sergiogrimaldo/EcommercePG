import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const colores = {
    borde:'#04ff19',
    error:'#bb2929',
    exito:'#1ed12d',
    defecto:'#82000088'
}

export const Label = styled.label`
    display:block;
    color:#0f0f0f;
    font-weight:700;
    padding:10px;
    min-height:40px;
    cursor:pointer;
    ${props => props.valido !== undefined && css`
        color:${colores.error};
    ` }
`

export const ValidateIcon = styled(FontAwesomeIcon)`
    position:absolute;
    bottom:8px;
    z-index:100;
    font-size:14px;
    opacity:0;
    top:5px;

    ${props => props.valido !== undefined && css`
        opacity:1;
        color:${colores.error};
    `}

    ${props => props.valido === undefined && css`
        opacity:1; 
        color:${colores.exito};
    `}

`

export const InputContainer = styled.div`
    position:relative;
    z-index:90;
    margin-top:10px;
`
  

export const CenterButton = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    grid-column:span 2;
    margin-top:-70px;
`
export const Boton = styled.button`
    height:45px;
    line-height:45px;
    width:30%;
    background:#82000039;
    color:#820000;
    font-weight:bold;
    border:none;
    border-radius:3px;
    cursor:pointer;
    transition:.1s ease all;
    &:hover{
        box-shadow:3px 0px 30px #820000b5;
    }
`
export const MenssageError = styled.div`
    height:45px;
    line-height: 45px;
    background:#f66060;
    padding:0px 15px;
    border-radius:3px;
    grid-column:span 2;
    p{
        margin:0;
    }
    b{
        margin-left:10px;
    }
`

export const StylError = styled.p`
    font-size:0.8rem;
    margin-bottom:0;
    margin-top:-2px;

    color:${colores.error};
    display:none;
    ${props => props.valido !== undefined && css`
        display:block;
    `}
`