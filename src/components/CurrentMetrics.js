import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { useSubscription } from 'urql'

import Grid from '@material-ui/core/Grid'

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

const CurrentMetrics = () => {

  const dispatch = useDispatch()
  const metrics = useSelector(state => state.metrics)

  //Subscribe to latest measurements for metrics
  const [result] = useSubscription({ query: currentMetrics }, handleSubscription);
  const { data, error } = result

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }

    if(!data) return
    dispatch({ type: actions.METRIC_MEASUREMENT_UPDATE, data });
  }, [dispatch, data, error])

  return(
    <Grid container spacing={2} justify="center" alignItems="center">
      {metrics.list.map((key, i) => {
        const metric = metrics.metrics[key]

        return(
          <Grid key={i} item sm={12} md={6}>
            <MetricCard
              metric={key}
              value={metric.value ? metric.value : 'N/A'}
              unit={metric.unit ? metric.unit : ''}
              updatedAt={metric.at ? metric.at : ''}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CurrentMetrics
