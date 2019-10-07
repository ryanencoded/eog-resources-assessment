import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { useQuery } from "urql";
import { withStyles } from '@material-ui/core/styles';
import {FormLabel, FormControl, FormGroup} from '@material-ui/core';

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
    const metrics = useSelector(state => state.metrics.list)
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

    return(
      <FormControl component="fieldset" className={classes.formControl}>
       <FormLabel component="legend">Select Metrics</FormLabel>
       <FormGroup>
        {metrics.map((metric, i) => (
          <MetricItem
            label={metric}
            value={metric}
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
