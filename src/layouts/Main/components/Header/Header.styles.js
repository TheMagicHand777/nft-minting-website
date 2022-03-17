import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: 'background, height 0.5s',
        background: `${theme.palette.background.secondary}33`,
        boxShadow: '0 0 4px rgba(0, 0, 0, .5)',
        zIndex: theme.zIndex.drawer + 1,

        '&.light': {
            background: 'transparent',
            boxShadow: 'none'
        },
        color: theme.palette.text.primary
    },
    toolbar: {
        transition: 'all 0.5s',
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'center',
        height: theme.spacing(10),
        [theme.breakpoints.up('md')]: {
            height: theme.spacing(14)
        },
        '&.small': {
            [theme.breakpoints.down('sm')]: {
                height: theme.spacing(7)
            },
            [theme.breakpoints.up('md')]: {
                height: theme.spacing(10)
            }
        }
    },
    navBar: {
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.5s',
        // [theme.breakpoints.up('md')]: {
        //     marginTop: theme.spacing(-5)
        // },
        '&.small': {
            [theme.breakpoints.up('md')]: {
                marginTop: 0
            }
        }
    },
    connectButton: {
        width: theme.spacing(16)
    }
}))

export default useStyles
