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

const WhitePaper = (paper) => {
    let expandArticle = () => {
        console.log('expand article ', paper.id)
    }

    console.log('paper object seconds before creation of whitepaper =', paper)

    let truncatedContent = truncate(paper.content.rendered, 20, { ellipsis: '<a>...</a>' })
    truncatedContent = ReactHtmlParser(truncatedContent)

    return (
        <Card key={paper.id} style={cardStyle}>
            <Card.Content onClick={expandArticle}>
                <Card.Header style={titleStyle}><p style={pStyle}>{paper.title.rendered}</p></Card.Header>
                <Card.Description style={contentStyle}>{truncatedContent}</Card.Description>
            </Card.Content>
            <Card.Content>
                <a href={paper.downloadLink} download>
                    <p>{paper.downloadLink}</p>
                    <Icon name='download' />
                </a>
            </Card.Content>
        </Card>
    )
}

export default WhitePaper