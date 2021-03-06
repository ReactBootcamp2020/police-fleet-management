import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10px'
  },
  warning: {
    color: '#f0ad4e'
  }
}));

export const AssignedIssues = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.heading} variant="h6">Assigned Issues</Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '20%', textAlign: 'center' }}>
          <Typography variant="h1">0</Typography>
          <Typography variant="caption">Over Due</Typography>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Typography className={classes.warning} variant="h1">1</Typography>
          <Typography variant="caption">Open</Typography>
        </div>
      </div>
    </Paper>
  );
}

export default AssignedIssues;