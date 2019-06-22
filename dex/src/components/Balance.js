import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Spinner from './Spinner';
import {
  loadBalances,
  depositEther,
  depositToken,
  withdrawEther,
  withdrawToken
} from '../store/interactions';
import {
  zentadexSelector,
  tokenSelector,
  accountSelector,
  web3Selector,
  etherBalanceSelector,
  tokenBalanceSelector,
  zentadexEtherBalanceSelector,
  zentadexTokenBalanceSelector,
  balancesLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector,
  tokenDepositAmountSelector,
  tokenWithdrawAmountSelector,
} from '../store/selectors';
import {
  etherDepositAmountChanged,
  etherWithdrawAmountChanged,
  tokenDepositAmountChanged,
  tokenWithdrawAmountChanged,
} from '../store/actions'
const showForm = (props) => {
  const {
    dispatch,
    zentadex,
    web3,
    account,
    etherBalance,
    tokenBalance,
    zentadexEtherBalance,
    zentadexTokenBalance,
    etherDepositAmount,
    token,
    tokenDepositAmount,
    etherWithdrawAmount,
    tokenWithdrawAmount
  } = props

  return(
    <Tabs defaultActiveKey="deposit" className="balance text-light">

      <Tab eventKey="deposit" title="Deposit" className="balance">
        <table className="balance table table-sm small text-light">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{zentadexEtherBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositEther(dispatch, zentadex, web3, etherDepositAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-0">
            <input
            type="text"
            placeholder="ETH Amount"
            onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value) ) }
            className="form-control form-row align-items-center bg-dark text-light border border-white"
            required />
          </div>
          <div className="col-12 col-m pr-s-0 p-0">
            <button type="submit" className="btn-block btn-success btn-s">Deposit ETH</button>
          </div>     
        </form>
        <table className="balance table table-sm small text-success">
          <tbody>
            <tr>
              <td>ZENTA</td>
              <td>{tokenBalance}</td>
              <td>{zentadexTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositToken(dispatch, zentadex, web3, token, tokenDepositAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-0">
            <input
            type="text"
            placeholder="ZENTA Amount"
            onChange={(e) => dispatch( tokenDepositAmountChanged(e.target.value) )}
            className="form-control form-row align-items-center bg-dark text-light border border-white"
            required/>
          </div>
          <div className="col-12 col-m pr-sm-0 p-0">
            <button type="submit" className="btn-block btn-success btn-sm-s">Deposit ZENTA</button>
          </div>
        </form>
      </Tab>

      <Tab eventKey="withdraw" title="Withdraw" className="balance text-light">

        <table className="balance table table-sm small text-light">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{zentadexEtherBalance}</td>
            </tr>
          </tbody>
        </table>
        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawEther(dispatch, zentadex, web3, etherWithdrawAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-0">
            <input
            type="text"
            placeholder="ETH Amount"
            onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
            className = "form-control form-row align-items-center bg-dark text-light border border-white"
            required/>
          </div>
          <div className="col-12 col-m pr-s-0 p-0">
            <button type="submit" className="btn-block btn-primary btn-m">Withdraw ETH</button>
          </div>
        </form>
        <table className="table table-sm small text-success">
          <tbody>
            <tr>
              <td>ZENTA</td>
              <td>{tokenBalance}</td>
              <td>{zentadexTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawToken(dispatch, zentadex, web3, token, tokenWithdrawAmount, account)
        }}>
          <div className="col-12 col-sm pr-sm-0">
            <input
            type="text"
            placeholder="ZENTA Amount"
            onChange={(e) => dispatch( tokenWithdrawAmountChanged(e.target.value) )}
            className="form-control form-row align-items-center bg-dark text-light border border-white"
            required />
          </div>
            &nbsp;
          <div className="col-12 col-m pr-s-0 p-0">
            <button type="submit" className="btn-block btn-primary btn-m">Withdraw ZENTA</button>
          </div>

        </form>
      </Tab>
    </Tabs>
  )
}

class Balance extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const { dispatch, web3, zentadex, token, account } = this.props
    await loadBalances(dispatch, web3, zentadex, token, account)
  }

  render() {
    return (
      <div className="card balance">
        <div className="balance card-header text-light">
          
        </div>
        <div className="balance card-body text-light ">
          {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const balancesLoading = balancesLoadingSelector(state)

  return {
    account: accountSelector(state),
    zentadex: zentadexSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    etherBalance: etherBalanceSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    zentadexEtherBalance: zentadexEtherBalanceSelector(state),
    zentadexTokenBalance: zentadexTokenBalanceSelector(state),
    balancesLoading,
    showForm: !balancesLoading,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state),
    tokenDepositAmount: tokenDepositAmountSelector(state),
    tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
  }
}

export default connect(mapStateToProps)(Balance)
