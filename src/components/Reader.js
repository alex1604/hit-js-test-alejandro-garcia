import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import WhitePaper from './WhitePaper';


const readerStyle = {
  marginTop: '3vh',
  width: '96vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'space-around',
};

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      papersLoaded: false,
    };
    this.parser = new DOMParser();
  }

  async componentDidMount() {
    const { whitepapers } = this.props;
    this.setState({ whitepapers }, () => {
      this.setState({ papersLoaded: true });
    });
  }


  render() {
    const { whitepapers, papersLoaded } = this.state;
    const renderWhitePapers = papersLoaded ? whitepapers.map(paper => WhitePaper(paper)) : null;
    return (
      <div style={readerStyle} className="ui stackable cards centered">
        {renderWhitePapers}
      </div>
    );
  }
}

export default Reader;
