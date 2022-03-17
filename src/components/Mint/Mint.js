import {useContext, useEffect, useRef, useState} from 'react'
import {Box, Button, CircularProgress, Container, Grid, Paper, Typography} from '@material-ui/core'
import {SnackbarContext} from 'context'

import useStyles from './Mint.styles'

import {ethers} from 'ethers'

import {RINKEBY_CONTRACT_ADDRESS, MAIN_CONTRACT_ADDRESS, CONTRACT_ABI} from 'config/constants'

const MAX_MINTING_COUNT = 5

const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null

const Mint = () => {
    const classes = useStyles()
    const {showMessage} = useContext(SnackbarContext)

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(0)
    const [freeSupply, setFreeSupply] = useState(0)

    const [mintedCount, setMintedCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const remainingCount = totalCount - mintedCount

    const [mintingCount, setMintingCount] = useState(1)

    const [isMinting, setIsMinting] = useState(false) // true when user got to press MINT
    const [isSoldOut, setIsSoldOut] = useState(false) // true when items remaining is zero

    const connect = async () => {
        return connectMetamask()
    }
    const disconnect = async () => {
        setConnected(false)
        setAccount(null)
        setBalance(null)
    }
    const connectMetamask = async () => {
        try {
            const [acc] = await provider.send('eth_requestAccounts', [])
            setConnected(true)
            setAccount(acc)
            loadAccountDetails(acc)
            loadContractDetails()
        } catch (ex) {
            showMessage(ex.message || 'Error occurred while connecting the metamask', 'error')
        }
    }

    async function loadAccountDetails(acc) {
        let bal = await provider.getBalance(acc)
        // we use the code below to convert the balance from wei to eth
        bal = ethers.utils.formatEther(bal)
        setBalance(parseFloat(bal).toFixed(4))
    }

    const getContractAddress = () => {
        switch ('rinkeby') {
            case 'rinkeby':
                return RINKEBY_CONTRACT_ADDRESS
            case 'main':
                return MAIN_CONTRACT_ADDRESS
            default:
                return null
        }
    }

    const loadTotalCount = async contract => {
        const _totalCount = (await contract.TOTAL_SUPPLY()).toNumber()
        setTotalCount(_totalCount)
    }
    const loadMintedCount = async contract => {
        const _mintedCount = (await contract.totalSupply()).toNumber()
        setMintedCount(_mintedCount)
    }
    const loadFreeSupply = async contract => {
        const _freeSupply = (await contract.FREE_SUPPLY()).toNumber()
        setFreeSupply(_freeSupply)
    }

    const loadContractDetails = async () => {
        const contract = new ethers.Contract(getContractAddress(), CONTRACT_ABI, provider)

        return Promise.all([
            loadTotalCount(contract),
            loadMintedCount(contract),
            loadFreeSupply(contract)
        ])
    }

    const mint = async () => {
        try {
            const signer = provider.getSigner()
            const contract = new ethers.Contract(getContractAddress(), CONTRACT_ABI, signer)

            const isFreeSale = await contract.isFreeSale()

            if (isFreeSale) {
                const transaction = await contract.freeMint()
                await transaction.wait()
            } else {
                const price = (await contract.MINT_PRICE()).mul(mintingCount)
                const transaction = await contract.mint(mintingCount, {value: price})
                await transaction.wait()
            }

            showMessage(`Mint ${mintingCount} NFTs successfully.`)

            loadAccountDetails(account)
            loadContractDetails()
        } catch (ex) {
            console.log(ex)
            showMessage(
                'Error occurred while minting.' +
                    (ex?.error?.message ? ` (${ex.error.message})` : ''),
                'error'
            )
        }
    }

    const handleMint = async () => {
        setIsMinting(true)

        await mint()

        setIsMinting(false)
    }

    const handleDecrementClick = () => {
        setMintingCount(count => (count > 1 ? count - 1 : count))
    }
    const handleIncrementClick = () => {
        setMintingCount(count =>
            count < MAX_MINTING_COUNT && count < remainingCount ? count + 1 : count
        )
    }

    return (
        <Box className={classes.root}>
            <Container maxWidth="xl">
                <Box textAlign="center">
                    <Typography variant="h3">Mint Filler Art NFT</Typography>
                </Box>
                <Box marginTop={8} textAlign="center">
                    <Box>
                        <Typography variant="subtitle1">
                            Remaining {remainingCount} of {totalCount}
                        </Typography>
                    </Box>
                    <Box marginTop={2} className={classes.countContainer}>
                        <Button
                            className={classes.countButton}
                            disabled={!connected || isSoldOut || isMinting}
                            onClick={handleDecrementClick}
                        >
                            -
                        </Button>
                        <Typography component="span" variant="subtitle1" className={classes.count}>
                            {mintingCount}
                        </Typography>
                        <Button
                            className={classes.countButton}
                            disabled={!connected || isSoldOut || isMinting}
                            onClick={handleIncrementClick}
                        >
                            +
                        </Button>
                    </Box>
                    <Box marginTop={2} className={classes.mintButtonWrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.mintButton}
                            disabled={!connected || isMinting || isSoldOut}
                            onClick={handleMint}
                        >
                            {isSoldOut ? 'SOLD OUT' : 'Mint NFT'}
                        </Button>
                        {isMinting && (
                            <CircularProgress size={20} className={classes.buttonProgress} />
                        )}
                    </Box>
                    <Box marginTop={2}>
                        {provider ? (
                            <ConnectButton
                                connected={connected}
                                account={account}
                                balance={balance}
                                connect={connect}
                                disconnect={disconnect}
                                classes={classes}
                            />
                        ) : (
                            <Box>
                                <InstallMetamask />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

const ConnectButton = ({connected, account, balance, connect, disconnect, classes}) =>
    connected ? (
        <Box>
            <Button
                variant="contained"
                color="primary"
                className={classes.mintButton}
                onClick={disconnect}
            >
                Disconnect
            </Button>
            <Box marginTop={2}>
                <Typography variant="subtitle1">{account}</Typography>
            </Box>
            <Box marginTop={1}>
                <Typography variant="subtitle2">{balance} ETH</Typography>
            </Box>
        </Box>
    ) : (
        <Box>
            <Button
                variant="contained"
                color="primary"
                className={classes.mintButton}
                onClick={connect}
            >
                Connect Metamask
            </Button>
        </Box>
    )

const InstallMetamask = () => (
    <Typography variant="h6" color="textSecondary">
        Install Metamask
    </Typography>
)

const Progress = ({classes, percent, count}) => (
    <Box className={classes.progressContainer}>
        <Box className={classes.progressBack}></Box>
        <Box className={classes.progress} style={{width: `${percent}%`}}></Box>
        <Box className={classes.percent} textAlign="center" style={{left: `${percent}%`}}>
            <Typography variant="body1" style={{fontSize: 10}}>
                {count}
            </Typography>
        </Box>
    </Box>
)

export default Mint
