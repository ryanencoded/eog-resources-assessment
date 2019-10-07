import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { useSubscription } from 'urql'
import { withStyles } from '@material-ui/core/styles';

import Loading from "./Loading"
import MetricCard from "./MetricCard"

const currentMetrics = `
  subscription CurrentMetricsSub {
    newMeasurement {
      metric,
      value,
      at,
      unit
    }
  }
`;

const handleSubscription = (metrics = [], response) => response.newMeasurement

const CurrentMetrics = ({
  classes
}) => {

  const dispatch = useDispatch()
  const metrics = useSelector(state => state.metrics)
  const [result] = useSubscription({ query: currentMetrics }, handleSubscription);
  const { data, error } = result

  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      dispatch({ type: actions.METRIC_MEASUREMENT_UPDATE, data });
    },
    [dispatch, data, error]
  );

  return(
    <div className={classes.root}>
      {metrics.list.map((key, i) => {
        const metric = metrics.metrics[key]

        return(
          <MetricCard
            key={i}
            metric={key}
            value={metric.value ? metric.value : 'N/A'}
            unit={metric.unit ? metric.unit : ''}
            updatedAt={metric.at ? metric.at : ''}
          />
        )
      })}
    </div>
  )
}

const styles = {
  root: {
    display: 'flex'
  }
}

export default withStyles(styles)(CurrentMetrics)
