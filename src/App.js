import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Reader from './components/Reader';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedPapers: false
    }
    this.getDownloadLink = this.getDownloadLink.bind(this)
  }

  async getDownloadLink (links) {
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
        paper['downloadLink'] = res
      })
    })
  }

  async componentDidMount() {
    const response = await fetch('https://humanit.se/wp-json/wp/v2/whitepaper');
    const json = await response.json();
    await this.addPdf(json)
    console.log(json)
    this.setState({ whitepapers: json}, () => {
      console.log(this.state.whitepapers)
      this.setState({loadedPapers: true})
    })
  }
  render() {
    let reader = this.state.loadedPapers !== false ? (
      <Reader whitepapers={this.state.whitepapers}/>
    ) : null
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="mainTitle">Human IT News</h2>
        </header>
        {reader}
      </div>
    );
  }
}

export default App;
