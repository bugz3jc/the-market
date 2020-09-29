import React from 'react';
import {
    Container, Breadcrumbs, Link, Typography, Table, TableCell, TableBody, TableHead, TableRow, Paper, TableContainer, Grid, TableFooter, Button, TextField, IconButton, ButtonGroup
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles( (theme) => (
    {
        root : {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(8),
            flexGrow: 1,
            textAlign: 'center'
            
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
        },
        quantintyEl: {
            color: theme.palette.common.black + '!important'
        }
}


));
const formatter = new Intl.NumberFormat('en-PH',{
    style: 'currency',
    currency:'PHP',
    minimumFractionDigits: 2
});
const Cart = (props) => {
    const { history, cartItems } = props;
    const classes = useStyles();
    let subtotal = 0;
    const standardShipping = 150
    if(cartItems.length < 1){
        return (
            <Container className={classes.root}>
                <Typography variant="h6" align="center" className={classes.padding}>
                    There's no items in your cart.
                </Typography>
                <Button variant="contained" color="primary" onClick ={() => history.push('/shop')}>
                    Continue Shopping
                </Button>
            </Container>
        )
    }else{
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
            <Typography variant="h4" className={classes.marginBottom} align="left">
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
                                        {formatter.format(i.price)}
                                    </TableCell >
                                    <TableCell align="right">
                                        
                                        <ButtonGroup color="secondary" size="small">
                                            <Button onClick={() => props.changeQuantity(k, 'plus')}><Add /></Button>
                                            <Button disabled className={classes.quantintyEl}>{i.quantity}</Button>
                                            <Button onClick={() => props.changeQuantity(k, 'minus')}><Remove /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell align="right">
                                        {formatter.format(i.price * i.quantity)}
                                    </TableCell>
                                    <TableCell>
                                    <IconButton aria-label="delete" onClick={() => props.onCartRemove(k)}>
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
                                    
                                    <TextField variant="outlined" label="Enter Coupon"/>
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
                                    {formatter.format(subtotal)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Shipping
                                </TableCell>
                                <TableCell align="right">
                                    <Typography>Standard Shipping </Typography>
                                    <Typography>{formatter.format(standardShipping)}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">TOTAL</Typography>
                                    </TableCell>
                                
                                <TableCell align="right">
                                    <Typography variant="h6">{formatter.format(subtotal + standardShipping)}</Typography>
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
    )}
}

export default withRouter(Cart);