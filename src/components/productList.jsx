import React, {useEffect , useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import ProductCard from './productCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start'
        

    }
}));

const ProductList = (props) =>{
    useEffect( () => {
        fetchData(props);
    }, [props]);
    
    const [products, setProducts] = useState([]);
    const fetchData = async () => {
            let params = 'list';
        if (props.category){
            params = 'category/' + props.category
        }

        if (props.keyword)
            {
                params = 'search/' + props.keyword
            }
        const fetchData = await fetch(
                'http://api.johncristayco.me/product/' + params
        );

        const products = await fetchData.json();
        const numberOfItems = props.rows * 3 || products.length;
        
        
        setProducts(products.slice(0, numberOfItems));
        
    };
    
    
    const classes = useStyles();
    return (
    <div className={classes.root}>
        {products.map((item, key) => (
            <ProductCard key={key} data={item} />
    ))}
    </div>
    
    );
}


export default ProductList;