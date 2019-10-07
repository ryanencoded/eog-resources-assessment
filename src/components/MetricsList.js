import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";
import { withStyles } from '@material-ui/core/styles';
import {FormLabel, FormControl, FormGroup} from '@material-ui/core';

import Loading from "./Loading"
import MetricItem from "./MetricItem"

const query = `
  query {
    getMetrics
  }
`;

const MetricsList = ({
  classes
}) => {

    const dispatch = useDispatch();
    const metrics = useSelector(state => state.metrics)
    const [result] = useQuery({
      query
    });
    const { fetching, data, error } = result;

    useEffect(
      () => {
        if (error) {
          dispatch({ type: actions.API_ERROR, error: error.message });
          return;
        }
        if (!data) return;
        const { getMetrics } = data;
        dispatch({ type: actions.METRICS_LIST_RECEIVED, getMetrics });
      },
      [dispatch, data, error]
    );

    const isSelected = (metric) => metrics.selected.includes(metric)

    const toggleMetric = metric => dispatch({ type: actions.METRIC_TOGGLE, metric });


    if(fetching){
      return <Loading />
    }

    return(
      <FormControl component="fieldset" className={classes.formControl}>
       <FormLabel component="legend">Select Metrics</FormLabel>
       <FormGroup>
        {metrics.list.map((metric, i) => (
          <MetricItem
            label={metric}
            value={metric}
            checked={isSelected(metric)}
            onChange={() => toggleMetric(metric)}
            key={i}
          />
        ))}
       </FormGroup>
      </FormControl>
    )

}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
});

export default withStyles(styles)(MetricsList)
