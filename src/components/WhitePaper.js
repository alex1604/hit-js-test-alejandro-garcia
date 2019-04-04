import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser';

var truncate = require('html-truncate');

const cardStyle = {
    minHeight: '30vh',
    minWidth: '33vw',
    border: '2px solid black'
}
const titleStyle = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.3em'
}
const contentStyle = {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1em'
}
const pStyle = {
    textAlign: 'justify'
}

let getDownloadLink = links => {
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

const WhitePaper = async paper => {
    let expandArticle = () => {
        console.log('expand article ', paper.id)
    }

    let truncatedContent = truncate(paper.content.rendered, 20, { ellipsis: '<a>...</a>' })
    truncatedContent = ReactHtmlParser(truncatedContent)

    //let downloadUri = getDownloadLink(links)
    return (
        <Card key={paper.id} style={cardStyle}>
            <Card.Content onClick={expandArticle}>
                <Card.Header style={titleStyle}><p style={pStyle}>{paper.title.rendered}</p></Card.Header>
                <Card.Description style={contentStyle}>{truncatedContent}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a href={paper.pdfUri} download>
                    <Icon name='download' />
                </a>
            </Card.Content>
        </Card>
    )
}

export default WhitePaper