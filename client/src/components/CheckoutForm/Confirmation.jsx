import React from 'react'
import {Typography} from '@material-ui/core';

function Confirmation({message, backStep}) {
    return (
        <>
            <Typography variant='h6'>{message}</Typography>
            <button onClick={backStep}> Back </button>
        </>
    )
}

export default Confirmation
