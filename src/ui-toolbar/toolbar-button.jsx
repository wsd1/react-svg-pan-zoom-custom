import React from 'react';
import PropTypes from 'prop-types';
import {
  POSITION_TOP, POSITION_BOTTOM
} from '../constants';

export default class ToolbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  change(event) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.type) {
      case 'mouseenter':
      case 'touchstart':
        this.setState({hover: true});
        break;
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        this.setState({hover: false});
        break;
      default:
        //noop
    }
  }

  render() {

    let color = this.props.disabled?'#888':(this.props.active || this.state.hover ? this.props.activeColor : '#FFF')
    let cursor = this.props.disabled?"auto":"pointer";
    let style = {
      display: "block",
      width: "40px",
      height: "40px",
      margin: [POSITION_TOP, POSITION_BOTTOM].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
      color,//: this.props.active || this.state.hover ? this.props.activeColor : '#FFF',
      transition: "color 200ms ease",
      background: "none",
      padding: "0px",
      border: "0px",
      outline: "0px",
      cursor,//: "pointer"
    };

    return (
      <button
        onMouseEnter={e => this.change(e)}
        onMouseLeave={e => this.change(e)}

        onTouchStart={e => {
          this.change(e);
          this.props.onClick(e);
        }}
        onTouchEnd={e => this.change(e)}
        onTouchCancel={e => this.change(e)}

        onClick={this.props.onClick}

        style={style}
        title={this.props.title}
        name={this.props.name}
        type="button"
        disabled={this.props.disabled}
      >{this.props.children}</button>
    )
  }

}

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toolbarPosition: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};
