import React from 'react'
import {observer} from 'mobx-react-lite'
import Chip from '@material-ui/core/Chip'
import {useMst} from '../state'

function Tags({onVideo, overrideTags}) {
  const {tags} = useMst()
  return (
    <div style={{padding: 10}}>
      {tags.map(tag => {
        return (
          <Chip
            key={tag.id}
            style={{margin: 5}}
            onClick={tag.setSelected}
            label={tag.name}
            color={tag.selected ? 'primary' : 'default'}
          />
        )
      })}
    </div>
  )
}

export default observer(Tags)
