import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import inViewport from 'in-viewport';
import cx from 'classnames';


class Appear extends Component {
  state = {
    inViewport: false
  }
  static defaultProps = {
    className: 'appear-example'
  }
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  }
  setVisible = () => {
    this.setState({
      inViewport: true
    });
  }
  componentDidMount() {
    // watch for viewport entry
    const el = ReactDOM.findDOMNode(this);
    if (el) {
      this.watcher = inViewport(el, this.setVisible);
    } else {
      // fallback to visible
      this.setVisible();
    }
  }
  componentWillUnmount() {
    if (this.watcher) {
      this.watcher.dispose();
    }
  }
  render() {
    const className = cx(this.props.className, this.state.inViewport && `${this.props.className}--inViewport`);
    return <div className={className}>{ this.props.children }</div>;
  }
}

export default Appear;
