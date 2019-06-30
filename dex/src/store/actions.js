// WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}


export function tokenLoaded(contract) {
  return {
    type: 'TOKEN_LOADED',
    contract
  }
}


export function zentadexLoaded(contract) {
  return {
    type: 'ZENTADEX_LOADED',
    contract
  }
}

export function cancelledOrdersLoaded(cancelledOrders) {
  return {
    type: 'CANCELLED_ORDERS_LOADED',
    cancelledOrders
  }
}

export function filledOrdersLoaded(filledOrders) {
  return {
    type: 'FILLED_ORDERS_LOADED',
    filledOrders
  }
}

export function allOrdersLoaded(allOrders) {
  return {
    type: 'ALL_ORDERS_LOADED',
    allOrders
  }
}


export function orderCancelling() {
  return {
    type: 'ORDER_CANCELLING'
  }
}

export function orderCancelled(order) {
  return {
    type: 'ORDER_CANCELLED',
    order
  }
}




export function orderFilling() {
  return {
    type: 'ORDER_FILLING'
  }
}

export function orderFilled(order) {
  return {
    type: 'ORDER_FILLED',
    order
  }
}


export function etherBalanceLoaded(balance) {
  return {
    type: 'ETHER_BALANCE_LOADED',
    balance
  }
}

export function tokenBalanceLoaded(balance) {
  return {
    type: 'TOKEN_BALANCE_LOADED',
    balance
  }
}

export function zentadexEtherBalanceLoaded(balance) {
  return {
    type: 'ZENTADEX_ETHER_BALANCE_LOADED',
    balance
  }
}

export function zentadexTokenBalanceLoaded(balance) {
  return {
    type: 'ZENTADEX_TOKEN_BALANCE_LOADED',
    balance
  }
}

export function balancesLoaded() {
  return {
    type: 'BALANCES_LOADED'
  }
}

export function balancesLoading() {
  return {
    type: 'BALANCES_LOADING'
  }
}

export function etherDepositAmountChanged(amount) {
  return {
    type: 'ETHER_DEPOSIT_AMOUNT_CHANGED',
    amount
  }
}

export function etherWithdrawAmountChanged(amount) {
  return {
    type: 'ETHER_WITHDRAW_AMOUNT_CHANGED',
    amount
  }
}

export function tokenDepositAmountChanged(amount) {
  return {
    type: 'TOKEN_DEPOSIT_AMOUNT_CHANGED',
    amount
  }
}

export function tokenWithdrawAmountChanged(amount) {
  return {
    type: 'TOKEN_WITHDRAW_AMOUNT_CHANGED',
    amount
  }
}



export function buyOrderAmountChanged(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED',
    amount
  }
}

export function buyOrderPriceChanged(price) {
  return {
    type: 'BUY_ORDER_PRICE_CHANGED',
    price
  }
}

export function buyOrderMaking(price) {
  return {
    type: 'BUY_ORDER_MAKING'
  }
}


export function orderMade(order) {
  return {
    type: 'ORDER_MADE',
    order
  }
}


export function sellOrderAmountChanged(amount) {
  return {
    type: 'SELL_ORDER_AMOUNT_CHANGED',
    amount
  }
}

export function sellOrderPriceChanged(price) {
  return {
    type: 'SELL_ORDER_PRICE_CHANGED',
    price
  }
}

export function sellOrderMaking(price) {
  return {
    type: 'SELL_ORDER_MAKING'
  }
};
