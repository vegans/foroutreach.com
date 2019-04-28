import React from 'react'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import {lighten} from '@material-ui/core/styles/colorManipulator'
import TagSelector from './TagSelector'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
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
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      <div className={classes.innerWrapper}>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} videos in playlist
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle" />
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
            <Tooltip title="Toggle player">
              <IconButton onClick={() => setPlayerOpen(!playerOpen)}>
                {playerOpen ? <StopIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Tooltip>
          )}
          <TagSelector />
        </div>
      </div>
    </Toolbar>
  )
}

export default withStyles(toolbarStyles)(TableToobar)
