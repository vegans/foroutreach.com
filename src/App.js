import React from 'react'
import {useStore} from './hooks/useAppState'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import AppBar from './components/AppBar'
import TableToobar from './components/TableToolbar'
import File from './components/File'
import Player from './components/Player'

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
      <Paper style={{maxWidth: 600, margin: '0 auto'}}>
        <TableToobar
          playerOpen={playerOpen}
          setPlayerOpen={setPlayerOpen}
          numSelected={playlist.length}
        />
        <Player open={playerOpen} />
        <Table>
          <TableBody>
            {files.map(file => (
              <File key={file.id} {...file} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default App
