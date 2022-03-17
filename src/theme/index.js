import {createTheme, responsiveFontSizes} from '@material-ui/core'
import typography from './typography'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1440,
            xxl: 1920
        }
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#fff'
        },
        text: {
            primary: '#fff',
            secondary: '#fff',
            grey: '#464646'
        },
        background: {
            default: '#000',
            secondary: '#fff',
            grey: '#464646'
        },
        action: {
            disabledBackground: '#ffffff33',
            // disabled: '#686868'
        }
    },
    shape: {},
    typography,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale',
                    'scroll-behavior': 'smooth'
                },
                body: {
                    'overflow-x': 'hidden'
                }
            }
        },
        MuiContainer: {
            root: {
                // '@media (min-width: 900px)': {
                //     paddingLeft: 48,
                //     paddingRight: 48
                // },
                // '@media (min-width: 1536px)': {
                //     paddingLeft: 0,
                //     paddingRight: 0
                // }
            }
        },
        MuiButton: {
            root: {
                // paddingLeft: 40,
                // paddingRight: 40,
                // paddingTop: 10,
                // paddingBottom: 10,
                borderRadius: 0
            }
        }
    }
})

theme.props = {
    MuiPaper: {
        elevation: 0
    },
    MuiButton: {
        disableElevation: true
    },
    MuiLink: {
        underline: 'none'
    }
}

export default responsiveFontSizes(theme)
