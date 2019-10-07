import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const Loading = ({
  classes
}) => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
)

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
});

export default withStyles(styles)(Loading)
