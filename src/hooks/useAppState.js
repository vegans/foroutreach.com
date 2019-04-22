import React from 'react'
import createUseContext from "constate";
import useLocalStorage from 'react-use-localstorage';
import useOnlineStatus from './useOnlineStatus';
import useArray from './useArray'

function useFilelist() {
  const [files, setFiles] = useLocalStorage('@outreach/files', JSON.stringify([]));
  const [tags, setTags] = React.useState([]);
  const [selectedTags, toggleSelectedTag] = useArray([])
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE + '/videos')
      .then(result => result.json())
      .then(_files => {
        setFiles(JSON.stringify(_files))
      })
    fetch(process.env.REACT_APP_API_BASE + '/tags')
      .then(result => result.json())
      .then(_tags => {
        setTags(_tags.map(({id, name}) => ({id, name})))
      })
  }, [])
  const jsonFiles = JSON.parse(files).map(file => ({...file, id: String(file.id)}))
  const filesToShow = React.useMemo(() => {
    return selectedTags.length ? jsonFiles.filter(file => {
      const fileTagsIds = (file.tags && file.tags.map(_tag => _tag.id)) || []
      return file.tags && selectedTags.every(id => fileTagsIds.includes(id))
    }) : jsonFiles
  })

  return {files: filesToShow, tags, toggleSelectedTag, selectedTags}
}

function useAppState() {
  const {files, selectedTags, tags, toggleSelectedTag } = useFilelist();
  const online = useOnlineStatus();
  const [playlist, toggle,, remove] = useArray([])
  const isPlaylistItem = id => playlist.includes(id)

  return {
    online, toggleSelectedTag, selectedTags, tags, files, togglePlaylistItem: toggle, isPlaylistItem, playlist, removePlaylistItem: remove
  }
}

export const useStore = createUseContext(useAppState);

export const Provider = useStore.Provider
