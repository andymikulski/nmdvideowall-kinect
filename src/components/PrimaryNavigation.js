import React, { Component } from 'react';
// import fetch from 'fetch';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
// import store from '../lib/store';
import InlineCss from 'react-inline-css';

import * as entriesActionCreators from '../actions/EntriesAction.js';

@connect((state) => {
  return {
    active: state.active,
    router: state.router
  };
}, entriesActionCreators)
class PrimaryNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedOffset: 0,
      storedOffset: 0,
      dragOffset: 0,
      winWidth: window.innerWidth
    };

    window.addEventListener('mousedown', (e)=>{
      this.setState({
        dragging: true,
        storedOffset: this.state.displayedOffset,
        dragOffset: e.pageX
      });
    });

    window.addEventListener('mouseup', ()=>{
      this.setState({
        dragging: false,
        storedOffset: this.state.displayedOffset,
        dragOffset: 0
      });
    });

    window.addEventListener('mousemove', (e)=>{
      if (this.state.dragging === true) {
        this.setState({
          displayedOffset: this.state.storedOffset - (this.state.dragOffset - e.pageX),
          winWidth: window.innerWidth
        });
      }
    });
  }

  render() {
    const { entries, selected } = this.props;

    return (
      <InlineCss stylesheet={ this.css() } namespace="PrimaryNavigation">
        <div className={ this.props.active ? `primary-navigation` : `primary-navigation hidden` }>
          <ul key={ entries.size } style={{ transform: `translateX(${ this.state.displayedOffset - (this.state.winWidth / 2) }px)` }} >
            {
              entries.map((entry, idx)=>{
                return (
                  <li className="nav-item" key={ idx } title={ entry.location }>
                  { selected !== idx ? (<Link to={ `/${ idx + 1 }` }>{ entry.title }</Link>) : (<span>{ entry.title }</span>) }
                  </li>
                );
              })
            }
            {
              entries.map((entry, idx)=>{
                return (
                  <li className="nav-item" key={ idx } title={ entry.location }>
                  { selected !== idx ? (<Link to={ `/${ idx + 1 }` }>{ entry.title }</Link>) : (<span>{ entry.title }</span>) }
                  </li>
                );
              })
            }
            {
              entries.map((entry, idx)=>{
                return (
                  <li className="nav-item" key={ idx } title={ entry.location }>
                  { selected !== idx ? (<Link to={ `/${ idx + 1 }` }>{ entry.title }</Link>) : (<span>{ entry.title }</span>) }
                  </li>
                );
              })
            }

          </ul>
        </div>

        <br /><br />
        { this.generateErrorMessage() }
      </InlineCss>
    );
  }

  css() {
    return (`
      & > .primary-navigation {
        position: fixed;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;

        top: 50%;
        transform: translateY(-50%);
        left: 5%;
        right: 5%;
        z-index: 50;

        white-space: nowrap;

        transition: 0.3s opacity ease;
        opacity: 1;
      }

      & > .primary-navigation.hidden {
        opacity: 0;
      }

      & > .primary-navigation > ul .nav-item {
        display: inline-block;
        width: ${ 100 / (this.props.entries.size || this.props.entries.length || 1) }%;
        min-width: 200px;
        height: 10vh;
        box-shadow: inset 0px 0px 2px;
      }
    `);
  }

  generateErrorMessage() {
    let message = '';

    switch (this.state.errorCode) {
    default:
      message = '';
      break;
    }

    return message;
  }
}


function selector(state) {
  return state;
}
export default connect(
  selector,

  // Use an action creator for navigation
  { pushState }
)(PrimaryNavigation);
