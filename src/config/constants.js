import CONTRACT_ABI from './abi.json'

const RINKEBY_CONTRACT_ADDRESS = '0xEBBD42970944436f4CdBfCBCa91d213284851b16' // process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS ?? ''
const MAIN_CONTRACT_ADDRESS = process.env.REACT_APP_MAIN_CONTRACT_ADDRESS ?? ''

const TRANSACTION_TIMEOUT = 30000

export {RINKEBY_CONTRACT_ADDRESS, MAIN_CONTRACT_ADDRESS, CONTRACT_ABI, TRANSACTION_TIMEOUT}
