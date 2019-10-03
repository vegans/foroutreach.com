import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import {lighten} from '@material-ui/core/styles/colorManipulator'
import Badge from '@material-ui/core/Badge'
import TagSelector from './TagSelector'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  innerWrapper: {
    maxWidth: 600,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
  },
})

const TableToobar = props => {
  const {numSelected, classes, playerOpen, setPlayerOpen} = props

  return (
    <Toolbar className={classes.root}>
      <div className={classes.innerWrapper}>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle" />
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Toggle player">
            <div>
              <IconButton
                disabled={numSelected === 0}
                onClick={() => setPlayerOpen(!playerOpen)}>
                <Badge badgeContent={numSelected} color="secondary">
                  {playerOpen ? <StopIcon /> : <PlayArrowIcon />}
                </Badge>
              </IconButton>
            </div>
          </Tooltip>
          <TagSelector />
        </div>
      </div>
    </Toolbar>
  )
}

export default withStyles(toolbarStyles)(TableToobar)
