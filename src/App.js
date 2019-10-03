import React from 'react'
import {observer} from 'mobx-react-lite'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import TableBody from '@material-ui/core/TableBody'
import TableToolbar from './components/TableToolbar'
import Player from './components/Player'
import File from './components/File'
import AppBar from './components/AppBar'
import {useMst} from './state'

function App() {
  const [playerOpen, setPlayerOpen] = React.useState(false)
  const {videos, playlist} = useMst()
  return (
    <>
      <AppBar />
      <Paper style={{maxWidth: 600, margin: '0 auto'}}>
        <TableToolbar
          playerOpen={playerOpen}
          setPlayerOpen={setPlayerOpen}
          numSelected={playlist.length}
        />
        <Player open={playerOpen} />
        <Table>
          <TableBody>
            {videos.map(file => (
              <File key={file.id} video={file} />
            ))}
          </TableBody>
        </Table>
        <img
          src="/are.png"
          style={{
            maxWidth: '40%',
            margin: '0 auto',
            padding: 10,
            display: 'block',
          }}
        />
      </Paper>
    </>
  )
}

export default observer(App)
