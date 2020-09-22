import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container, Grid, Link, Breadcrumbs, Typography, Button, ButtonGroup, Box, Chip, TableContainer, Paper, Table, TableBody, TableRow, TableCell, Collapse
} from '@material-ui/core';
import {
    Alert, AlertTitle
} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => (
    {
        root: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(10)
        },
        productImage: {
            width: '100%'
        },
        marginBottom: {
            marginBottom: theme.spacing(2)
        },
        flexBox: {
            display:'flex',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1)
            }
        },
        itemSpacing: {
            '& > *': {
                marginBottom: theme.spacing(2)
            }
        },
        hSpacing: {
            marginRight: theme.spacing(0.5),
        }

    }
));
const ProductDetail = (props) => {
    window.scrollTo(0, 0);
    const classes = useStyles();
    const { match, history, cartItems } = props;
    useEffect(() => {
        fetchItem();
    }, [match]); 

    const [product, setProduct] = useState({});
    const [categoryChips, setCategoryChips] = useState([]);
    const [ai, setAi] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [alert, setAlert] = useState({
        open: false,
        name: '', 
        quantity: 0
    });
    const [isOnCart, setIsOnCart] = useState(false);



    const fetchItem = async () => {
        const fetchData = await fetch(
                `/data.json`
        );

        const data = await fetchData.json();
        let { products, categories } = data;
        products = products.filter((i) => {
            return i.SKU === match.params.id
        })[0];
        
        let cat = [];
        categories.map((i) => {
            if(products.categories.includes(i.id)){
                cat.push(i.name);
            }
            return false;
        });
        setAi(products.additionalInformation);
        setCategoryChips(cat);
        setProduct(products);
        cartItems.map((i) =>{
            if(i.SKU === products.SKU){
                setIsOnCart(true);
            }
            return false;
        });
    };
    const handleQuantity = (type) => {
        switch (type) {
            case 'add':
                if(quantity < (product.availableQuantity))  setQuantity(quantity + 1);
                break;
            case 'minus':
                if(quantity >= 2) setQuantity(quantity - 1);
                break;
            default:
                break;
        }
    }
    const addToCart = () => {
        const cartItem = {
            ...product,
            quantity: quantity
        }
        props.onCartAdd(cartItem);

        setAlert({
            open: true,
            name: product.name,
            id: product.SKU,
            quantity: quantity
        })
    }
return (
    <Container className={classes.root}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.marginBottom}>
                <Link color="inherit" href="#" onClick={(event) => { event.preventDefault(); history.push('/')}}>
                    Home
                </Link>
                <Link color="inherit" href="#" onClick={(event) => { event.preventDefault(); history.push('/shop')}}>
                    Shop
                </Link>
                <Typography color="textPrimary">{product.SKU}</Typography>
            </Breadcrumbs>
            <Collapse in={alert.open} className={classes.marginBottom}>
                 <Alert severity="success" onClose={() => { setAlert({open:false})}}>
                    <AlertTitle>Success</AlertTitle>
                    You added <strong>{quantity > 1 && quantity}</strong> of <strong>{alert.name} </strong>to your cart — 
                    <Button color="primary" onClick={( ) => history.push('/cart')}>Go to Cart</Button>
                    <Button color="primary" onClick={( ) => history.push('/shop')}>Continue Shopping</Button>
                </Alert>
            </Collapse>
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item md>
                <img src={product.image} className={classes.productImage}/>
            </Grid>
            <Grid item md className={classes.itemSpacing}>
                <Typography variant="h5">
                    {product.name}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    {product.description}
                </Typography>
                <Typography variant="h4" color="textPrimary">
                    Php{product.price}
                </Typography>
                <Box className={classes.flexBox}>
                    <Typography component="span">
                        Quantity : 
                    </Typography>
                    <Typography component="span" variant="body1"> {quantity}</Typography>
                       
                    <ButtonGroup variant="outlined" size="small" color="secondary" disabled={isOnCart}>
                        <Button onClick={() => handleQuantity('minus')} ><Remove /></Button>
                        <Button onClick={() => handleQuantity('add')}><Add /></Button>
                    </ButtonGroup>
                    <Typography component="span" variant="body2">
                        {product.availableQuantity} Available Quantity 
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" startIcon={<AddShoppingCart />} size="large" onClick={addToCart} disabled={isOnCart}>
                    {isOnCart && 'Added to Cart'} {!isOnCart && 'Add to Cart'}
                </Button>
                    <Typography variant="body1" component="p">
                        Brand : {product.brand}
                    </Typography>
                    <Typography variant="body1" component="div">
                        Categories {categoryChips && categoryChips.map((i,k) => (
                            <Chip key={k} label={i} className={classes.hSpacing} />
                        ))}
                    </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h5' className={classes.marginBottom}>
                    Additional Information
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            { ai && ai.map((i,k) => (
                                <TableRow key={k} >
                                    <TableCell width={250}><strong>{i.key}</strong></TableCell>
                                    
                                    <TableCell >{i.value}</TableCell>
                                </TableRow>
                            )  )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        
    </Container>
)
}

export default withRouter(ProductDetail);