import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components';
import WhitePaper from './WhitePaper'

let links = []

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        papersLoaded: false
    };
    this.parser = new DOMParser();
    //this.getDownloadLink = this.getDownloadLink.bind(this)
  }
  /*async getDownloadLink (links) {
    let attachmentUri = links["wp:attachment"][0].href
    if (attachmentUri === undefined) {
      return -1
    }
    const response = await fetch(attachmentUri);
    const body = await response.body.getReader().read()
    const decoded = await String.fromCharCode(...new Uint8Array(body.value))
    const parsed = await JSON.parse(decoded)
    const pdfUri = parsed[0] !== undefined ? await parsed[0].source_url : undefined
    return pdfUri
  }
  addPdf = (papers) => {
    return papers.map(paper => {
      this.getDownloadLink(paper._links).then(function(res) {
        links.push(res)
        console.log(links)
      })
    })
  }*/

  async componentDidMount(){
    this.setState({whitepapers: this.props.whitepapers}, () => {
        this.setState({papersLoaded: true})
        /*this.addPdf(this.props.whitepapers)
    }, () => {
        this.setState({papersLoaded: true, links: links})
    })*/
    //let links = await this.addPdf(this.props.whitepapers)
  })
}

  render() {
    const { whitepapers } = this.state
    let renderWhitePapers = this.state.papersLoaded ? whitepapers.map(paper => 
        WhitePaper(paper)) : null
    return (
      <ReaderContainer className="ui stackable cards centered">
        {renderWhitePapers}
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
