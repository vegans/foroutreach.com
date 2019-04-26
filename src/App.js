import React from 'react'
import File from './File'
import {useStore} from './hooks/useAppState'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import AppBar from './AppBar'
import TableToobar from './components/TableToolbar'
import Player from './Player'

function App() {
  const {files, playlist} = useStore()
  const [playerOpen, setPlayerOpen] = React.useState(false)
  React.useEffect(() => {
    if (playlist.length === 0) {
      setPlayerOpen(false)
    }
  }, [playlist])
  return (
    <>
      <AppBar />
      <TableToobar
        playerOpen={playerOpen}
        setPlayerOpen={setPlayerOpen}
        numSelected={playlist.length}
      />
      <div style={{maxWidth: 600, margin: '0 auto'}}>
        <Player open={playerOpen} />
        <Table>
          <TableBody>
            {files.map(file => (
              <File key={file.id} {...file} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default App
