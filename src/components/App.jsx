import './App.css';
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="Root">
        <header className="Header">React Visualization Demo</header>
        <div className="Body">{this.props.children}</div>
        <footer className="Footer">Developed by Cameron Perry  &bull; <a href='https://github.com/cameronperry/redux-d3'>View Code on GitHub</a></footer>
      </div>
    );
  }
});
