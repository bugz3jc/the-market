import React, {useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import {
    Button,
    Container, Grid, TextField, InputAdornment, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Box, Chip, Breadcrumbs, Link
} from '@material-ui/core';
import ProductList from './../components/productList';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => (
    {
        root: {
            padding: '1rem 0',
        },
        formControl: {
            width: '100%'
        },
        gutterBottom: {
            marginBottom: theme.spacing(3),
        },
        divider: {
            marginBottom: theme.spacing(2)
        },
        shopHeader: {
            display: 'flex',
            alignItems: 'center',
            '& > *': {
                marginRight: theme.spacing(1)
            }
        },
        gridItem: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        breadcrumb: {
            marginBottom: theme.spacing(2)
        },
        grower: {
            flexGrow: 1
        }
    }
));
const Shop = (props) => {
    
    window.scrollTo(0, 0);
    useEffect(()=>{
        fetchData();
    }, []);
    const [categories, setCategories] = useState([]);
    
    const [keyword, setKeyword] = useState('');
    const fetchData = async() => {
        const data = await fetch(
            'http://api.johncristayco.me/category/list'
        );

        const categories = await data.json();
        const cat = [{
            category_id: 0,
            label: 'All',
            },
            ...categories
            ];
        setCategories(cat);


    }
    const [selectedCategory, setSelectedCategory] = useState({
        category_id: 0,
        label: 'All'
    });
    const categoryChange = (event) => {
        let cat = categories.filter((item)=>{
            return item.category_id === event.target.value
        })[0];
        setSelectedCategory(cat);
    }
    const handleSearch = (event) => {
        if(event.key === 'Enter'){
            setSelectedCategory({
                category_id: 0,
                label: 'All'
            });
            setKeyword(event.target.value);
        }
    }
    const handleClear = () => {
        setKeyword('');
        setSelectedCategory({
            category_id: 0,
            label: 'All'
        });
        document.getElementById('searchbar').value = '';
    }
    const classes = useStyles();
    const { history } = props;
    return (
        
        <Container className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
                <Link color="inherit" href="#" onClick={(event) => { event.preventDefault(); history.push('/')}}>
                    Home
                </Link>
                <Typography color="textPrimary">Shop</Typography>
            </Breadcrumbs>
            <Grid container spacing={2}>
                <Grid item sm={3} className={classes.gridItem}>
                    
                            <Typography variant="subtitle1">
                                Categories
                            </Typography>
                            <Divider light className={classes.divider}/>
                            <FormControl className={`${classes.formControl} ${classes.gutterBottom}`} variant="filled">
                                <InputLabel id="categories">Select Categories</InputLabel>
                                <Select
                                    labelId="categories"
                                    id="categoryInput"
                                    value={selectedCategory.category_id}
                                    onChange={categoryChange}
                                    >
                                    {categories.map((i,k) => (
                                        <MenuItem value={i.category_id} key={k}>{i.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="subtitle1">
                                Product Search
                            </Typography>
                            <Divider light className={classes.divider}/>
                        
                            <TextField id="searchbar"
                                        label="Search"
                                        variant="filled"
                                        InputProps= {{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <Search />
                                                </InputAdornment>
                                            ),
                                        }}

                                        onKeyUp={handleSearch}
                                        className={`${classes.formControl} ${classes.gutterBottom}`}
                                        />
                            <Button variant="contained" color="secondary" onClick={handleClear}>
                                Clear
                            </Button>
                        
                </Grid>
               

                <Grid item sm={9}  className={classes.gridItem}>
                        <Box className={classes.shopHeader}>
                            <Typography variant="h4">
                                Shop
                            </Typography>
                            
                            <Chip  label={selectedCategory.label}/>

                            {keyword && <Chip label={`"${keyword}"`} />}
                            <div className={classes.grower}></div>

                        </Box>

                        
                        <ProductList category={selectedCategory.category_id} keyword={keyword}/>
                        
                </Grid>
            </Grid>
        </Container>
    )
}

export default withRouter(Shop);