import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  zentadexSelector,
  tokenSelector,
  accountSelector,
  web3Selector,
  buyOrderSelector,
  sellOrderSelector
} from '../store/selectors'
import {
  buyOrderAmountChanged,
  buyOrderPriceChanged,
  sellOrderAmountChanged,
  sellOrderPriceChanged,
} from '../store/actions'
import {
  makeBuyOrder,
  makeSellOrder
} from '../store/interactions'

const showForm = (props) => {
  const {
    dispatch,
    buyOrder,
    zentadex,
    token,
    web3,
    account,
    sellOrder,
    showBuyTotal,
    showSellTotal
  } = props

  return(
    <Tabs defaultActiveKey="buy" className="balance text-light">

      <Tab eventKey="buy" title="Buy" className="balance">
          
          <form onSubmit={(event) => {
            event.preventDefault()
            makeBuyOrder(dispatch, zentadex, token, web3, buyOrder, account)
          }}>
          <div className="form-group small">
            <label>Buy (ZENTA)</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-row align-items-center bg-dark text-light border border-white"
                placeholder="Buy Amount"
                onChange={(e) => dispatch( buyOrderAmountChanged( e.target.value ) )}
                required
              />
            </div>
          </div>
          <div className="form-group small text-light">
            <label>Buy Price</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-row align-items-center bg-dark text-light border border-white"
                placeholder="Buy Price"
                onChange={(e) => dispatch( buyOrderPriceChanged( e.target.value ) )}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-sm btn-block">Buy Order</button>
          { showBuyTotal ? <medium>Total: {buyOrder.amount * buyOrder.price} ETH</medium> : null }
        </form>

      </Tab>

      <Tab eventKey="sell" title="Sell" className="balance">

        <form onSubmit={(event) => {
          event.preventDefault()
          makeSellOrder(dispatch, zentadex, token, web3, sellOrder, account)
        }}>
        <div className="form-group small text-light">
          <label>Sell (ZENTA)</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-row align-items-center bg-dark text-light border border-white"
              placeholder="Sell amount"
              onChange={(e) => dispatch( sellOrderAmountChanged( e.target.value ) )}
              required
            />
          </div>
        </div>
        <div className="form-group small">
          <label>Sell Price</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-row align-items-center bg-dark text-light border border-white"
              placeholder="Sell Price"
              onChange={(e) => dispatch( sellOrderPriceChanged( e.target.value ) )}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger btn-sm btn-block">Sell Order</button>
        { showSellTotal ? <medium>Total: {sellOrder.amount * sellOrder.price} ETH</medium> : null }
      </form>
      
      </Tab>
    </Tabs>
  )
}

class NewOrder extends Component {

  render() {
    return (
      <div className="card balance text-white sm-1">
        <div className="card-header">
          Order
        </div>
        <div className="card-body">
          {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const buyOrder = buyOrderSelector(state)
  const sellOrder = sellOrderSelector(state)

  return {
    account: accountSelector(state),
    zentadex: zentadexSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    buyOrder,
    sellOrder,
    showForm: !buyOrder.making && !sellOrder.making,
    showBuyTotal: buyOrder.amount && buyOrder.price,
    showSellTotal: sellOrder.amount && sellOrder.price
  }
}

export default connect(mapStateToProps)(NewOrder)
