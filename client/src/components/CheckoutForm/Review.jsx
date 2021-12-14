import React from 'react';
import {Typography,List} from '@material-ui/core';
import accounting from 'accounting';
import { ListItem } from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import {useSelector} from 'react-redux';



function Review() {
    const cart = useSelector(state => state.cart);
    let total = 0;
    cart?.forEach((item) => {
        total = total + (item.price*item.cuantity);
    });
    
    return (
        <div>
            <Typography variant='h6' gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {
                    cart?.map(shoes => (
                        <ListItem key={shoes.name}>
                            <ListItemText primary={shoes.name} secondary={`cuantity:${shoes.cuantity}`} />
                            <Typography>
                                {accounting.formatMoney(`${shoes.price*shoes.cuantity}`)}
                            </Typography>
                        </ListItem>
                    ))
                }
                
                <ListItem>
                    <ListItemText primary="Total:"/>
                    <Typography variant="subtitle1">
                        {
                            accounting.formatMoney(total)
                        }
                    </Typography>
                </ListItem>
                
            </List>
        </div>
    )
}

export default Review
 