import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Reader from './components/Reader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPapers: false,
    };
    this.addPdf = this.addPdf.bind(this);
    this.getDownloadLink = this.getDownloadLink.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('https://humanit.se/wp-json/wp/v2/whitepaper');
    const json = await response.json();
    await this.addPdf(json);
    this.setState({ whitepapers: json }, () => {
      this.setState({ loadedPapers: true });
    });
  }

  async getDownloadLink(links) {
    const attachmentUri = links['wp:attachment'][0].href;
    if (attachmentUri === undefined) {
      return -1;
    }
    const response = await fetch(attachmentUri);
    const body = await response.body.getReader().read();
    const decoded = await String.fromCharCode(...new Uint8Array(body.value));
    const parsed = await JSON.parse(decoded);
    const pdfUri = await parsed[0] !== undefined ? parsed[0].source_url : undefined;
    return pdfUri;
  }

  addPdf(papers) {
    const self = this;
    const promises = papers.map(paper => new Promise(((resolve, reject) => {
      // ett promise för varje download link
      self.getDownloadLink(paper._links).then((res) => {
        paper.downloadLink = res;
        paper.fileName = paper.slug + '.pdf'
      }).then(() => {
        if (paper.downloadLink !== undefined) {
          fetch('http://localhost:3001/save?file=' + paper.downloadLink + '&fileName=' + paper.slug + '.pdf', {
            method: 'GET'
          }).then((res) => {
            console.log(res)
          }).catch((err) => console.log(err))
        }
      })
      .then(()=>{
        resolve()
      })
      .catch((err) => {
        reject(err);
      });
    })));
    return Promise.all(promises); // returna något som vi kan skriva await framför
  }

  render() {
    const { loadedPapers, whitepapers } = this.state;
    const reader = loadedPapers !== false ? (
      <Reader whitepapers={whitepapers} />
    ) : null;
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="mainTitle">DET DIGITALA PARAPLYET</h2>
        </header>
        {reader}
      </div>
    );
  }
}

export default App;
