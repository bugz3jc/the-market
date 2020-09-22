import React, {useEffect , useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import ProductCard from './productCard';

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
    const fetchData = async (props) => {
        const fetchData = await fetch(
                `/data.json`
        );

        const data = await fetchData.json();
        let { products } = data;
        const numberOfItems = props.rows * 3 || products.length;
        if(props.category){
           products = data.products.filter(item =>{
                return item.categories.includes(props.category);
            });
            
        }
        if (props.keyword){
            products = data.products.filter(item => {
                return item.name.indexOf(props.keyword) >= 0;
            });
        }
        console.log(props);
        setProducts(products.slice(0, numberOfItems));
        
    };
    
    
    const classes = useStyles();
    return (
    <div className = {classes.root}>
        {products.map((item, key) => (
            <ProductCard key={key} data={item} />
    ))}
    </div>
    
    );
}


export default ProductList;