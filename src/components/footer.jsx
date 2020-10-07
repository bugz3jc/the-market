import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import {
    Typography, Container, Grid, TextField, Button, Divider
} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
const useStyles = makeStyles((theme) => (
    {
        root: {
            width: '100%',
            backgroundColor: '#000',
            color: '#fff',
            padding: '2rem 0'
        },
        footerNav: {
            marginBlockStart: 0,
            marginBlockEnd: 0,
            paddingInlineStart: 0,
            '& li': {
                display: 'block',
                padding: '4px'

            },
            '& li a': {
                textDecoration: 'none',
                color: theme.palette.common.white
            }
        },
        TextField: {
            marginBottom: theme.spacing(2),
            '& label.Mui-focused, & label': {
              color: theme.palette.grey[500],
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: theme.palette.grey[500],
            },
            '& .MuiOutlinedInput-root': {
                color: theme.palette.grey[500],
                backgroundColor: theme.palette.grey[900],
              '& fieldset': {
                borderColor: theme.palette.grey[500],
              },
              '&:hover fieldset': {
                borderColor: theme.palette.grey[500],
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.grey[500],
              },
            },
          },
          divider: {
              backgroundColor: theme.palette.grey[500],
              margin: '1rem 0' 
          }
    }
));

const Footer = (props) => {
    const { history } = props;
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
        
    ];
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                
                <Grid container spacing={3}>
                    <Grid item md xs={12}>
                        <Typography variant="h6">
                            The Market
                        </Typography>
                        <Divider  className={classes.divider}/>
                        <ul className={classes.footerNav} >
                            { navigationItem.map( (i,k) => (
                                <li key={k}>
                                    <Link to={i.link}>
                                        {i.text}
                                    </Link>
                                </li>
                            )
                            )
                        }
                        </ul>
                    </Grid>
                    <Grid item md xs={12}>
                        <Typography variant="h6">
                            Address
                        </Typography>
                        <Divider className={classes.divider}/>
                        <Typography component="p">
                            1009  Hartway Street,Stickney, <br />
                            South Dakota, 57375<br />
                            <small><CallIcon style={{verticalAlign:'bottom'}}/></small> 605-732-4810

                        </Typography>
                    </Grid>
                    <Grid item md xs={12}>
                        <Typography variant="h6">
                            Subscribe
                        </Typography>
                        <Divider  className={classes.divider}/>
                        <form noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Email" variant="outlined" className={classes.TextField} color="primary"/> <br />
                            <Button type="button" variant="contained" color="primary" disableElevation>
                                Subscribe
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(Footer);