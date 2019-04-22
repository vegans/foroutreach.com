import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

function Delete({onClick}) {
  const [clicked, setClicked] = React.useState(false)
  React.useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setClicked(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [clicked])
  if (clicked) {
    return (
      <IconButton onClick={onClick}>
        <CheckIcon />
      </IconButton>
    )
  }
  return (
    <IconButton onClick={() => setClicked(true)}>
      <DeleteIcon />
    </IconButton>
  )
}

export default Delete
