import {createMuiTheme} from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8e24aa',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

export default theme
