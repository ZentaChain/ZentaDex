import Swal from 'sweetalert2'
import Web3 from 'web3'
import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  zentadexLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelling,
  orderCancelled,
  orderFilling,
  orderFilled,
  etherBalanceLoaded,
  tokenBalanceLoaded,
  zentadexEtherBalanceLoaded,
  zentadexTokenBalanceLoaded,
  balancesLoaded,
  balancesLoading,
  buyOrderMaking,
  sellOrderMaking,
  orderMade
} from './actions'
import Token from '../abis/Token.json'
import Zentadex from '../abis/Zentadex.json'
import { ETHER_ADDRESS } from './helpers'

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
  dispatch(web3Loaded(web3))
  return web3
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  dispatch(web3AccountLoaded(account))
  return account
}

export const loadToken = async (web3, networkId, dispatch) => {
  try {
    const token = web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch(tokenLoaded(token))
    return token
  } catch (error) {
    console.log('Contract not deployed to the current-Network. Please select another Network with Metamask.')
    return null
  }
}

export const loadZentadex = async (web3, networkId, dispatch) => {
  try {
    const zentadex = web3.eth.Contract(Zentadex.abi, Zentadex.networks[networkId].address)
    dispatch(zentadexLoaded(zentadex))
    return zentadex
  } catch (error) {
    console.log('Contract not deployed to the current Network. Please select another Network with Metamask.')
    return null
  }
}

export const loadAllOrders = async (zentadex, dispatch) => {
  // Fetch cancelled Orders with the "Cancel"
  const cancelStream = await zentadex.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled Orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues)
  
  dispatch(cancelledOrdersLoaded(cancelledOrders))

  // Trades
  const tradeStream = await zentadex.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
  // Format filled Orders
  const filledOrders = tradeStream.map((event) => event.returnValues)
  // Cancelled orders to the redux store
  dispatch(filledOrdersLoaded(filledOrders))

  // Load Orders
  const orderStream = await zentadex.getPastEvents('Order', { fromBlock: 0,  toBlock: 'latest' })
  
  const allOrders = orderStream.map((event) => event.returnValues)
  // Orders
  dispatch(allOrdersLoaded(allOrders))
}

export const subscribeToEvents = async (zentadex, dispatch) => {
  zentadex.events.Cancel({}, (error, event) => {
    dispatch(orderCancelled(event.returnValues))
  })

  zentadex.events.Trade({}, (error, event) => {
    dispatch(orderFilled(event.returnValues))
  })

  zentadex.events.Deposit({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  zentadex.events.Withdraw({}, (error, event) => {
    dispatch(balancesLoaded())
  })

  zentadex.events.Order({}, (error, event) => {
    dispatch(orderMade(event.returnValues))
  })
}

export const cancelOrder = (dispatch, zentadex, order, account) => {
  zentadex.methods.cancelOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling())
  })
  .on('error', (error) => {
    console.log(error)
    Swal.fire('There was an error!')
  })
}

export const fillOrder = (dispatch, zentadex, order, account) => {
  zentadex.methods.fillOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderFilling())
  })
  .on('error', (error) => {
    console.log(error)
    Swal.fire('There was an error with filling your Order!')
  })
}

export const loadBalances = async (dispatch, web3, zentadex, token, account) => {
  // Ether balance in Wallet
  const etherBalance = await web3.eth.getBalance(account)
  dispatch(etherBalanceLoaded(etherBalance))

  // Token balance in Wallet
  const tokenBalance = await token.methods.balanceOf(account).call()
  dispatch(tokenBalanceLoaded(tokenBalance))

  // Ether balance on Zentadex
  const zentadexEtherBalance = await zentadex.methods.balanceOf(ETHER_ADDRESS, account).call()
  dispatch(zentadexEtherBalanceLoaded(zentadexEtherBalance))

  // Token balance on Zentadex
  const zentadexTokenBalance = await zentadex.methods.balanceOf(token.options.address, account).call()
  dispatch(zentadexTokenBalanceLoaded(zentadexTokenBalance))

  // Trigger all balances Loader
  dispatch(balancesLoaded())
}

export const depositEther = (dispatch, zentadex, web3, amount, account) => {
  zentadex.methods.depositEther.send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error',(error) => {
    console.error(error)
    Swal.fire(`There was an error check your balances or Metamask-Account Are you on the right network and right Account!`)
  })
}

export const withdrawEther = (dispatch, zentadex, web3, amount, account) => {
  zentadex.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error',(error) => {
    console.error(error)
    Swal.fire(`There was an error with withdraw Ethereum!`)
  })
}

export const depositToken = (dispatch, zentadex, web3, token, amount, account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(zentadex.options.address, amount).send({ from: account })
  .on('transactionHash', (hash) => {
    zentadex.methods.depositToken(token.options.address, amount).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(balancesLoading())
    })
    .on('error',(error) => {
      console.error(error)
      Swal.fire(`There was an error with deposite Tokens!`)
    })
  })
}

export const withdrawToken = (dispatch, zentadex, web3, token, amount, account) => {
  zentadex.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error',(error) => {
    console.error(error)
    Swal.fire(`There was an error withdrawing Token - Check your Balance`)
  })
}

export const makeBuyOrder = (dispatch, zentadex, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  zentadex.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking())
  })
  .on('error',(error) => {
    console.error(error)
    Swal.fire(`There was an error a buy Order - Check your Balance!`)
  })
}

export const makeSellOrder = (dispatch, zentadex, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount, 'ether')

  zentadex.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account })
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking())
  })
  .on('error',(error) => {
    console.error(error)
    Swal.fire(`There was an error with selling your Order - Check you Balance!`)
  })
}