import React from 'react';
import { Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Checkout from './Checkout/Checkout';
import Pricing from './Pricing/Pricing';

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
    }
}));

export default function PublicInterface() {
    const classes = useStyles();

    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            <Container>
                <Route path="/public-interface/pricing">
                    <Pricing />
                </Route>
                <Route path="/public-interface/checkout">
                    <Checkout />
                </Route>
            </Container>
        </main>
    );
}
