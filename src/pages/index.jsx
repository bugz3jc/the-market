import React, {useEffect, useState} from "react";
import { 
    Container,
    Box, Typography, ButtonBase, useMediaQuery, Button, Paper
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ProductList from './../components/productList';
import Carousel from "react-material-ui-carousel";
import {withRouter} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    hero:{
        width: '100%',
    },
    heroItems: {
        
        height: '68vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition:'center center'
        

    },
    sectionPadding: {
        padding: '2rem 0'
    },
    mobileHero:{
        height: '68vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column',
        backgroundColor: theme.palette.grey[900],
        color: '#fff'
    },
    cta: {
        width: 200,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        transitionDuration: theme.transitions.duration.standard,
        marginTop: theme.spacing(2),
        '&:hover':{
            backgroundColor: theme.palette.primary.dark
        }
    },
    paperContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    paper: {
        width: '100%',
        marginBottom: 16,
        [theme.breakpoints.up(700)]:{
            maxWidth: 250,
        },
        '& span': {
            display: 'block'
        },
        '& img': {
            width: '100%',
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius
        }

    },
    sectionBG: {
        backgroundColor: theme.palette.background.paper 
    }
}));
const carouselItems = [
    {
        image: 'https://dfestore.com/wp-content/uploads/2020/09/slider_dx120.jpg',

    },
    {
        image: 'https://dfestore.com/wp-content/uploads/2020/09/slider_wacom.jpg'
    }
]
const Hero = (props) => {
    return (
        <Box className={props.classes.heroItems} style={{backgroundImage: `url(${props.image})`}}>
            <Container maxWidth="md" >
                
                <ButtonBase focusRipple className={props.classes.cta} onClick={props.click}>
                    SHOP NOW
                </ButtonBase>
            </Container>
        </Box>
    )
}
const Home = (props) => {
    
    window.scrollTo(0, 0);
    useEffect(() => {
        fetchData();
    }, []);
    const {history} = props;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(700));
    const classes = useStyles();

    const [cat, setCat ] = useState([]);
    const fetchData = async (props) => {
        const d = await fetch(`http://api.johncristayco.me/category/list`);

        const data = await d.json();
        setCat(data);
    }

    return (
            <div className={classes.root}>
                <section id="hero" className={classes.hero}>
                    {isDesktop && 
                        <Carousel style={{backgroungColor: '#000'}}>
                            {carouselItems.map((i,k) => (
                                <Hero key={k} image={i.image} classes={classes} click={() => history.push('/shop')}/>
                            ))}
                        </Carousel>
                    }
                    {
                        !isDesktop && 
                        <Box className={classes.mobileHero}>
                            <Typography variant="h2" color="inherit" as="h2" style={{marginBottom: 8}}>
                                Build your rig
                            </Typography>
                            <Button variant="contained" color="primary" size="large" onClick={() => history.push('/shop')}>
                                Shop Now
                            </Button>
                        </Box>
                    }
                        
                    
                </section>
                <section className={classes.sectionPadding}>
                    <Container maxWidth="md">
                        <Box py={2} style={{textAlign: 'center'}}>
                            <Typography gutterBottom variant='h5' align="center">
                                Categories
                            </Typography>
                            <div className={classes.paperContainer}>
                                {cat.map((i,k) => (
                                    <Paper key={k} className={classes.paper}>
                                        <img src={i.image} alt=""/>
                                        <Typography variant="h6" component="span" align="center">
                                            {i.label}
                                        </Typography>
                                    </Paper>
                                ))}
                            </div>
                            <ButtonBase focusRipple className={classes.cta} onClick={ () => history.push('/shop')}>
                                VIEW ALL
                            </ButtonBase>
                        </Box>
                    </Container>
                </section>
                <section className={`${classes.sectionBG} ${classes.sectionPadding}`}>
                    <Container maxWidth="md" style={{textAlign: 'center'}}>
                            <Typography variant='h5' align="center">
                                Featured
                            </Typography>
                        <ProductList  row={1}/>
                        <ButtonBase focusRipple className={classes.cta} onClick={ () => history.push('/shop')}>
                                SHOP NOW
                        </ButtonBase>
                    </Container>
                </section>
                <section className={classes.sectionPadding}>
                <Container maxWidth="md" style={{textAlign: 'center'}}>
                        <Typography  variant='h5' align="center">
                            About Us
                        </Typography>
                        <Typography variant="body1" align="center" >
                            <strong>The Market</strong> aims to provide the growing I.T. Industry with affordable and quality computer equipments and services through our physical outlets and convenience of online shopping and delivery.
                        </Typography>
                        <ButtonBase focusRipple className={classes.cta} onClick={ () => history.push('/about')}>
                               LEARN MORE
                        </ButtonBase>
                    </Container>
                </section>
            </div>
    )
}

export default withRouter(Home);