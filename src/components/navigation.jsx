import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Logo from './../images/favicon-32x32.png';

const useStyles = makeStyles( (theme) => (

    {
        root: {
            flexGrow: 1,
        },
        brandIcon: {
            marginRight: theme.spacing(2),
            width: '32px',
            height: '32px'
        },  
        grow: {
            flexGrow: 1,
        },
        appBar: {
            backgroundColor: "transparent",
            '&.dark':{
                color: theme.state.textColor.dark,
                '& ul:hover a':{
                    color: theme.state.hoverTextColor.dark
                },
                '& ul li a:hover': {
                    color: theme.state.textColor.dark
                }
            },
            '&.light':{
                color: theme.state.textColor.light,
                '& ul:hover a':{
                    color: theme.state.hoverTextColor.light
                },
                '& ul li a:hover': {
                    color: theme.state.textColor.light
                }
            },
            '& a':{
                color:'inherit'
            }
        },
        branding: {
            display: "flex",
            textDecoration: 'none',
        },
        navigation:{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            '& li':{
                display:'inline-block',
                '& a':{
                    padding: '0 16px',
                    lineHeight: '61px',
                    display: 'inline-block',
                    textDecoration: 'none',
                    color: 'inherit',
                    transitionDuration: '.3s',
                },
                '& a.active': {
                    fontWeight: 'bolder'
                }
            }
        },
        nav:{
            alignSelf: 'stretch',
            display: 'none',
            alignItems:'center',
            [theme.breakpoints.up(700)]:{
                display: 'flex'
            }

        },
        navIconMobile: {
            display: 'flex',
            [theme.breakpoints.up(700)]:{
                display: 'none'
            }
        },
        iconReset:{
            verticalAlign:'middle',
            marginRight:'3px'
        },
        
        drawerList:{
            width: 250
        }


    }

));

 function ButtonAppBar( props ) {
     const { history, location, cart } = props;
     const user = {};
     const profileText = (typeof user.name !== 'undefined') ? `Hi, ${user.name}!` : 'Login';
  const navigationItem = 
    [
        {
            text: 'Home',
            link: '/',
            onClick: () => history.push('/'),
        },
        {
            text: 'Shop',
            link: '/shop',
            onClick: () => history.push('/shop')
        },
        // {
        //     text: 'About',
        //     link: '/about',
        //     onClick: () => history.push('/about')
        // }
        // ,
        // {
        //     text: 'Contact',
        //     link: '/contact',
        //     onClick: () => history.push('/contact')
        // }
    ];
    
    const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) =>{
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

    setDrawerState(open);
  }
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down(700));
  var style = 'dark';
  navigationItem.map((v,k) =>{
    if( location.pathname === v.link && v.style) style = v.style;
    return false;
    }
    );
  useEffect(()=>{
      if( match === false){
          setDrawerState(false);
      }
  },[match]);

  
  return (
      <div className={classes.grow}>
      <AppBar position="static" className={`${classes.appBar} ${style}`}  >
            <Toolbar variant="dense">
                <Typography variant="h6" className={classes.grow}>
                    <NavLink to="/" className={classes.branding} >
                        <img src={Logo} alt="" className={classes.brandIcon}/>
                        The Market
                    </NavLink>
                </Typography>
                <div className={classes.grow}></div>
                <Box className={classes.nav} fontFamily="fontFamily">
                    <ul className={classes.navigation}>
                        {
                            navigationItem.map((item, index) => (
                                
                                
                                <li key={index}>
                                    <NavLink exact to={item.link} activeClassName="active">{item.text}</NavLink>
                                </li>
                                
                            ))}
                        <li>
                            <Link href='#' >
                                    <AccountCircle className={classes.iconReset}/>
                                    {profileText}
                            </Link>
                        </li>
                        <li>
                            <Link href='#' onClick={(event) =>{event.preventDefault(); history.push('/cart')} }>
                                <Badge badgeContent={cart.length} color="secondary">
                                    <ShoppingCart className={classes.iconReset}/>
                                </Badge>
                            </Link>
                        </li>
                    </ul>
                </Box>
                <Box className={classes.navIconMobile}>
                    <IconButton 
                        onClick={toggleDrawer(true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
      </AppBar>
       
        <Drawer anchor="right" open={drawerState} onClose={toggleDrawer(false)} >
          <List className={classes.drawerList} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {
                navigationItem.map((item, index) =>{
                    const {text , onClick} = item;
                    return (
                        <ListItem button onClick={onClick} key={index}>
                            <ListItemText inset primary={text} />
                        </ListItem>
                    )
                })
            }
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <AccountCircle className={classes.iconReset}/>
                </ListItemIcon>
                <ListItemText primary={profileText}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCart className={classes.iconReset}/>
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Cart"/>
            </ListItem>
          </List>
        </Drawer>
      </div>
  );
}

export default withRouter(ButtonAppBar);