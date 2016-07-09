import './Home.css';
import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className="Home">
        <div className="Home-Link"><Link to="/Example1">Example 1: D3 Renders Everything + Animations</Link></div>
        <div className="Home-Link"><Link to="/Example2">Example 2: React Renders Everything - No Animations</Link></div>
        <div className="Home-Link"><Link to="/Example3">Example 3: React Renders Everything + Animations using setInterval</Link> (working but a work in progress)</div>
        <div className="Home-Link">Example 4: React Renders Everything + Animations using React Animations (coming soon)</div>
      </div>
    );
  }
});
