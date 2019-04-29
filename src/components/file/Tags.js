import React from 'react'
import Typography from '@material-ui/core/Typography'

function Tags({tags = []}) {
  return (
    <Typography variant="caption">
      {tags.map((tag, index) => (
        <React.Fragment key={tag.id}>
          <span>{tag.name}</span>
          {index < tags.length - 1 && '/'}
        </React.Fragment>
      ))}
    </Typography>
  )
}

export default Tags
