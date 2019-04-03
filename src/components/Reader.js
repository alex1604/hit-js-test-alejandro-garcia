import React, { Component } from 'react';

class Reader extends Component {
  componentDidMount() {
      fetch("https://humanit.se/wp-json/wp/v2/whitepaper", {
          method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
          console.log(data)
      })
  }
  render() {
    return (
      <div className="readerContainer">
    
      </div>
    );
  }
}

export default Reader;