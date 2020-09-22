import React, {useEffect , useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import {
        Box, Typography
    } from '@material-ui/core';
const useStyles = makeStyles({

    root: {
        display: 'flex',
        flexDirection: 'row',

    }
});

function ProductSpotlight(props){
    useEffect( () => {
        fetchData(props);
        
    }, [props]);
    
    const [product, setProduct] = useState({});
    const fetchData = async (props) => {
        const fetchData = await fetch(
                `/data.json`
        );

        const data = await fetchData.json();

        const product = data.products.filter(item => {
            return item.SKU === props.sku;
        } )[0];
        setProduct(product);
    };
    
    const classes = useStyles();
    
    return (

        <div className = {classes.root}>
            <Box style={{width: '100%'}}>
                <img src={product.image} alt="" style={{width: '100%'}}/>
            </Box>
            <Box style={{width: '100%'}}>
                <Typography variant="h4">
                    {product.name}
                </Typography>
            </Box>
        </div>
    
    );
}


export default ProductSpotlight;