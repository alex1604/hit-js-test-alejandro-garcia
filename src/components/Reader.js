import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import WhitePaper from './WhitePaper';

const readerContainer = {
  marginTop: '3vh',
  width: '90vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const readerStyle = {
  marginTop: '2vh',
  width: '90vw',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
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
  expandArticle = event => {
    console.log(event.target.key)
  }


  render() {
    const { whitepapers, papersLoaded } = this.state;
    let renderPapers = papersLoaded ? whitepapers.map(paper => {
      return <WhitePaper paper={paper} key={paper.id} expand={this.expandArticle} />
    }) : null
    return (
      <div style={readerContainer}>
        <p style={{ color: 'blue', textAlign: 'right', fontFamily: 'Lato, sans-serif', fontSize: '1em', alignSelf:'flex-end' }}><Icon name="info" />Click anywhere on a card to expand its content.</p>
        <div style={readerStyle} className="ui stackable cards centered">
          {papersLoaded ? renderPapers : null}
        </div>
      </div>
    );
  }
}

export default Reader;
