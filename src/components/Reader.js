import React, { Component } from 'react';

class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            whitepapers: undefined
        }
    }
  componentDidMount() {
      fetch("https://humanit.se/wp-json/wp/v2/whitepaper", {  // fetch whitepapers from API
          method: 'GET'
      })
      .then(response => response.json()) // 
      .then(data => {
          this.setState({whitepapers: data})
          console.log(this.state.whitepapers)
      })
      .catch(err => {
          // handle error
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