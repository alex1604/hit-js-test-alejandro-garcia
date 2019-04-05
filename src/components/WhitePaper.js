import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

const truncate = require('html-truncate');

const cardStyle = {
  minHeight: '30vh',
  minWidth: '33vw',
  border: '2px solid black',
  borderRadius: '0px',
};
const titleStyle = {
  fontFamily: 'Playfair Display, serif',
  fontSize: '1.3em',
};
const contentStyle = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '1em',
};
const pStyle = {
  textAlign: 'justify',
};

const WhitePaper = (paper) => {
  const expandArticle = () => {
    // function for expanding whitepaper
  };

  let truncatedContent = truncate(paper.content.rendered, 20, { ellipsis: '<a>...</a>' });
  truncatedContent = ReactHtmlParser(truncatedContent);

  return (
    <Card key={paper.id} style={cardStyle}>
      <Card.Content onClick={expandArticle}>
        <Card.Header style={titleStyle}><p style={pStyle}>{paper.title.rendered}</p></Card.Header>
        <Card.Description style={contentStyle}>{truncatedContent}</Card.Description>
      </Card.Content>
      {paper.downloadLink !== undefined ? (
        <Card.Content>
          <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer" download={`${paper.title}.pdf`}>
            <p />
            <Icon name="download" />
          </a>
        </Card.Content>
      ) : null}
    </Card>
  );
};

export default WhitePaper;
