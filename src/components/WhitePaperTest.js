import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

const truncate = require('html-truncate');

const cardStyle = {
    minHeight: '30vh',
    minWidth: '25vw',
    border: '2px solid black',
    borderRadius: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: '1vw',
    marginLeft: '1vw'
};
const titleStyle = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '1.3em',
    width: '90%'
};
const pStyle = {
    textAlign: 'justify',
};
const paperStyle = {
    minHeight: '25vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
};
const iconStyle = {
    position: 'absolute',
    bottom: '3%',
    right: '2%',
    color: 'blue'
}

const contentStyle = {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1.2em',
    width: '80%',
    textAlign: 'left'
}

class WhitePaper extends Component {
  constructor(props){
    super(props);
    this.state = {
        paper: this.props.paper
    }
  }
  componentDidMount(){
    let truncatedContent = truncate(paper.content.rendered, 20, {ellipsis: '<a>...</a>'});
    truncatedContent = ReactHtmlParser(truncatedContent);
    this.setState({truncatedContent: truncatedContent})
  }
  expandArticle = () => {
    console.log(paper.id)
  }

  render() {
    const { paper, truncatedContent } = this.state
    return (
        <Card key={paper.id} style={cardStyle}>
        <Card.Content style={paperStyle}>
            <Card.Header style={titleStyle}><p style={pStyle}>{paper.title.rendered}</p></Card.Header>
                <Card.Description onClick={this.expandArticle}>
                    {truncatedContent}
                </Card.Description>
        </Card.Content>
        {paper.downloadLink !== undefined ? (
            <Card.Content style={iconStyle} extra>
                <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer" download={`${paper.title}.pdf`}>
                    <Icon style={iconStyle} name="file pdf outline" />
                </a>
            </Card.Content>
        ) : null}
    </Card>
    );
  }
}

export default WhitePaper;
