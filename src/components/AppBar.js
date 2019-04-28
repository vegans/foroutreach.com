import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ConnectionIcon from '@material-ui/icons/SignalCellular4Bar'
import NoConnectionIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import GithubIcon from './GithubIcon'
import {useStore} from '../hooks/useAppState'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  wrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
}

function ButtonAppBar(props) {
  const {online} = useStore()
  const {classes} = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.wrapper}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Outreach movies
            </Typography>
            {online ? (
              <Tooltip title="Online">
                <ConnectionIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Offline">
                <NoConnectionIcon />
              </Tooltip>
            )}
            <Tooltip title="View source code">
              <IconButton
                onClick={() =>
                  window.open('https://github.com/vegans/foroutreach.com')
                }>
                <GithubIcon nativeColor="#ffffff" />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(ButtonAppBar)
