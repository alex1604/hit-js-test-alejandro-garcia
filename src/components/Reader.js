import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import WhitePaper from './WhitePaper'

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whitepapers: [],
    };
    this.parser = new DOMParser();
  }

  getDownloadLink = links => {
    let pdfUri
    let attachmentUri = links["wp:attachment"][0].href
    if (attachmentUri !== undefined) {
      fetch(attachmentUri, {
        method: 'GET'
      })
        .then(response => response.body)
        .then(body => {
          const reader = body.getReader();
          reader.read().then(res =>
            String.fromCharCode(...new Uint8Array(res.value))
          )
            .then(decoded =>
              JSON.parse(decoded)
            )
            .then(data => {
              if (data[0] !== undefined) {
                pdfUri = data[0].source_url
                console.log(pdfUri)
                return pdfUri
              }
            })
        })
        .catch(err => console.log(err))
    }
  }

  componentWillMount() {
    fetch('https://humanit.se/wp-json/wp/v2/whitepaper', { // fetch whitepapers from API
      method: 'GET',
    })
      .then(response => response.json()) //
      .then((data) => {
        this.setState({whitepapers: data})
      })
      .catch((err) => {
        console.log(err);
        // handle error
      })
  }

  componentDidMount(){
    let whitepapers = this.state.whitepapers
    for(let i=0; i < whitepapers.length; i++) {
      whitepapers[i].pdfUri = this.getDownloadLink(whitepapers[i]._links)
    }
    this.setState(whitepapers)
  }

  render() {
    const { whitepapers } = this.state;
    return (
      <ReaderContainer className="ui stackable cards centered">
        {whitepapers.map(paper => WhitePaper(paper.title.rendered, paper.content.rendered, paper.id, paper.pdfUri))}
      </ReaderContainer>
    );
  }
}

const ReaderContainer = styled.div`
  margin-top: 10vh;
  width: 96vw;
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;

export default Reader;
