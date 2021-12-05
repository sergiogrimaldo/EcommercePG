import React from 'react'
import {Typography} from '@material-ui/core';

function Confirmation({message}) {
    return (
        <>
            <Typography variant='h6'>{message}</Typography>
        </>
    )
}

export default Confirmation
