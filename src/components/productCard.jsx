import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme =>({
  root: {
    width: '100%',
    margin: theme.spacing(1),
    [theme.breakpoints.up(700)]:{
      width: '30%',
      minWidth: 250,
    }
  },
  media: {
    height: 250,
  },
  content:{
      display: 'flex',
      justifyContent: 'space-between'
  }
}));
const formatter = new Intl.NumberFormat('en-PH',{
  style: 'currency',
  currency:'PHP',
  minimumFractionDigits: 2
});
const ProductCard = (props) => {
  const {data, history} = props;
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={() => history.push(`/shop/${data.sku}`)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.image}
          title={data.name}
        />
        <CardContent className={classes.content}>
          <Typography variant="h6">
            {data.name}
          </Typography>
          <Typography variant="body1" align="right">
            {formatter.format(data.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default withRouter(ProductCard);