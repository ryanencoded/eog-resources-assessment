import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/actions"
import { useSubscription } from 'urql'

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
    <div>
      {Object.keys(metrics.current).map(metric => (
        <MetricCard
          key={metric}
          metric={metric}
          value={metrics.current[metric].value}
          unit={metrics.current[metric].unit}
          updatedAt={metrics.current[metric].at}
        />
      ))}
    </div>
  )
}

export default CurrentMetrics
