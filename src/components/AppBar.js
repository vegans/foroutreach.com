import React from 'react'
import {observer} from 'mobx-react-lite'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ConnectionIcon from '@material-ui/icons/SignalCellular4Bar'
import NoConnectionIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import GithubIcon from './GithubIcon'
import useOnlineStatus from '../hooks/useOnlineStatus'
import {useMst} from '../state'

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
  const online = useOnlineStatus()
  const {tab, setTab} = useMst()
  const {classes} = props
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setTab(newValue)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.wrapper}>
            <Tabs
              style={{flexGrow: 1}}
              value={tab}
              onChange={handleChange}
              aria-label="simple tabs example">
              <Tab label="Videos" />
              <Tab label="Print" />
              <Tab label="Slacktivism" />
            </Tabs>
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
                <GithubIcon htmlColor="#ffffff" />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(observer(ButtonAppBar))
