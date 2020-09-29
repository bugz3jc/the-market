import React from 'react';
import {
    Container, Breadcrumbs, Link, Typography, Table, TableCell, TableBody, TableHead, TableRow, Paper, TableContainer, Grid, TableFooter, Button, TextField, IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles( (theme) => (
    {
        root : {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            
        },
        cartTable: {
            
            flexGrow: 1,
            '& *': {
                flexGrow: 1
            }
        },
        marginBottom: {
            marginBottom: theme.spacing(4)
        },
        table: {
            minWidth: 650,
        },
        padding: {
            padding: theme.spacing(2)
        },
        cartContainer: {
            border: '1px solid',
            borderColor: theme.palette.divider
        }
}


));

const Cart = (props) => {
    const { history, cartItems } = props;
    console.log(cartItems);
    const classes = useStyles();
    let subtotal = 0;
    const standardShipping = 150
    return(
        <Container className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="#" onClick={(event) => { event.preventDefault(); history.push('/')}}>
                    Home
                </Link>
                <Link color="inherit" href="#" onClick={(event) => { event.preventDefault(); history.push('/shop')}}>
                    Shop
                </Link>
                <Typography color="textPrimary">Cart</Typography>
            </Breadcrumbs>
            <Typography variant="h4" className={classes.marginBottom}>
                Cart
            </Typography>
            <Grid container spacing={2}>
                <Grid item md={8}>
                <TableContainer component={Paper}      elevation={0} className={classes.cartContainer}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((i,k) => {
                                subtotal += i.price * i.quantity;
                                return (
                                <TableRow key={k}>
                                    <TableCell>
                                        <img src={i.image} alt={i.name}/>
                                        <Typography variant="body1">
                                            {i.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        Php {i.price}
                                    </TableCell >
                                    <TableCell align="right">
                                        {i.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        Php {i.price * i.quantity}
                                    </TableCell>
                                    <TableCell>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} align="right">
                                    
                                    <TextField variant="outlined" />
                                </TableCell>
                                <TableCell align="right" colSpan={2}>
                                    <Button variant="contained">Apply Coupon</Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                </Grid>
                <Grid item md={4}>
                <TableContainer component={Paper} className={classes.totals}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cart Totals</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Subtotal
                                </TableCell>
                                <TableCell align="right">
                                    Php {subtotal}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Shipping
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>Standard Shipping </Typography>
                                    <Typography>Php {standardShipping}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">TOTAL</Typography>
                                    </TableCell>
                                
                                <TableCell align="right">
                                    <Typography variant="h6">PHP {subtotal + standardShipping}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                
                                <TableCell align="right" colSpan={2}>
                                    <Button variant="contained" color="primary">
                                        Proceed to Checkout
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(Cart);