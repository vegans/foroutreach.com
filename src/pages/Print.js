import React from 'react'
import {observer} from 'mobx-react-lite'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import {createRemoteUrl, getSigns} from '../state/helpers'

function Print() {
  const [files, setFiles] = React.useState([])
  React.useEffect(() => {
    getSigns().then(json => setFiles(json))
  }, [])
  return (
    <div>
      {files.map(file => {
        console.log(file)
        return (
          <Card key={file.id}>
            <CardMedia
              component="img"
              image={createRemoteUrl(file.preview)}
              title={file.title}
            />
            <CardActions>
              {file.signfiles.map(signFile => {
                return (
                  <Button
                    key={signFile.id}
                    size="small"
                    color="primary"
                    href={createRemoteUrl(signFile.pdf)}>
                    {signFile.language}
                  </Button>
                )
              })}
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

export default observer(Print)
