import React from "react"
import moment from "moment"
import { withStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';

const MetricCard = ({
  classes,
  metric,
  value,
  unit,
  updatedAt
}) => {

  return(
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h3">
          {value}{unit}
        </Typography>
        <Typography variant="body2">
          {moment(updatedAt).from()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View History</Button>
      </CardActions>
    </Card>
  )
}

const styles = {
  card: {
    width: 275
  }
}

export default withStyles(styles)(MetricCard)
