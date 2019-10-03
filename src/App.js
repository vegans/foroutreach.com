import React from 'react'
import {observer} from 'mobx-react-lite'
import Paper from '@material-ui/core/Paper'
import AppBar from './components/AppBar'
import {useMst} from './state'
import Home from './pages/Home'
import Print from './pages/Print'

function App() {
  const {tab} = useMst()
  const renderTab = _tab => {
    switch (tab) {
      case 1:
        return <Print />
      default:
        return <Home />
    }
  }
  return (
    <>
      <AppBar />
      <Paper style={{maxWidth: 600, margin: '0 auto'}}>{renderTab(tab)}</Paper>
    </>
  )
}

export default observer(App)
