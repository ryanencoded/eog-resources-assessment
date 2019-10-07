import React from "react"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import moment from "moment"
import { withStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, Switch, Typography, FormControlLabel, Divider} from '@material-ui/core';

const MetricCard = ({
  classes,
  metric,
  value,
  unit,
  updatedAt
}) => {

  const dispatch = useDispatch();
  const metrics = useSelector(state => state.metrics)

  const isSelected = (metric) => metrics.selected.includes(metric)
  const toggleMetric = metric => dispatch({ type: actions.METRIC_TOGGLE, metric });

  return(
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5">
          {value} {unit}
        </Typography>
        <Typography variant="body2">
          {moment(updatedAt).format('MMM D, YYYY H:m:s A')}
        </Typography>

      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <FormControlLabel
          control={<Switch checked={isSelected(metric)} onChange={() => toggleMetric(metric)} value={metric} />}
          label="Display History"
        />
      </CardActions>
    </Card>
  )
}

const styles = {
  card: {
    minWidth: 275
  }
}

export default withStyles(styles)(MetricCard)
