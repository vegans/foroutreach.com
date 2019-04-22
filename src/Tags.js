import React from 'react';
import Chip from '@material-ui/core/Chip';
import {useStore} from './hooks/useAppState'

function Tags({onVideo, overrideTags}) {
  const {tags, toggleSelectedTag, selectedTags} = useStore()
  return (
    <div style={{padding: 10}}>
      {tags.map(({id, name}) => {
        const selected = selectedTags.some(_tag => _tag === id)
        return (
          <Chip
            key={id}
            style={{margin: 5}}
            onClick={() => toggleSelectedTag(id)}
            label={name}
            color={selected ? 'primary' : 'default'}
          />
        )
      })}
    </div>
  )
}


export default Tags;
