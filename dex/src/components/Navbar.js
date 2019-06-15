import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../store/selectors'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar .collapse.navbar-collapse">
          <a class="navbar-brand" href="https://zentadex.com">
            <img src="" width="30" height="30" class="d-inline-block align-top" alt=""></img>
                Zentadex
          </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="nav-button d-inline-block align-top">
              <button type="button" class="btn btn-sm btn-outline-primary text-light">Home</button>
              <span class="sr-only">(current)</span>
              &nbsp;
              <button type="button" class="btn btn-sm btn-outline-primary text-light">Zentachain</button>
              &nbsp;
              <button type="button" class="btn btn-sm btn-outline-primary text-light">Zenta</button>
              &nbsp;
              <button type="button" class="btn btn-sm btn-outline-primary text-light">Trade</button>
              &nbsp;
              <button type="button" class="btn btn-sm btn-outline-primary text-light">FAQ</button>
              &nbsp;
              <button type="button" class="btn btn-sm btn-outline-primary text-light">Contact</button>
              &nbsp;
          </div>

          <a className="nav-metamask btn-sm small" id="navMetamask">
            <a
              className = "nav-metamask text-light"
                href={`https://etherscan.io/address/${this.props.account}`}
              target="_blank"
              rel="noopener noreferrer"
            > Connected:
              {this.props.account}
            </a>
          </a>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar)
