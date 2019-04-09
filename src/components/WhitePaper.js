import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';
import ModalPaper from './ModalPaper'

const truncate = require('html-truncate');

const cardStyle = {
    minHeight: '30vh',
    minWidth: '25vw',
    border: '3px solid gray',
    borderRadius: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: '1vw',
    marginLeft: '1vw'
};
const titleStyle = {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1.3em',
    width: '90%'
};
const pStyle = {
    textAlign: 'left',
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

const hoveredIconStyle = {
    position: 'absolute',
    bottom: '3%',
    right: '2%',
    color: 'green'
}

const contentStyle = {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1.2em',
    width: '80%',
    textAlign: 'left'
}

class WhitePaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paper: this.props.paper,
            isPdfHovered: false
        }
        this.hoverUnHover = this.hoverUnHover.bind(this)
    }

    componentDidMount() {
        const { paper } = this.state
        let truncatedContent = truncate(paper.content.rendered, 20, { ellipsis: '...' });
        truncatedContent = ReactHtmlParser(truncatedContent);
        console.log(truncatedContent)
        this.setState({ truncatedContent: truncatedContent })
    }

    hoverUnHover() {
        this.setState({ isPdfHovered: !this.state.isPdfHovered })
    }

    render() {
        const { paper, truncatedContent } = this.state
        var fileName = paper.fileName
        return (
            <ModalPaper paper={paper} trigger={  // modal component wraps card component since card is the modal's trigger
                <Card key={paper.id} style={cardStyle} onClick={this.expandArticle}>
                    <Card.Content style={paperStyle}>
                        <Card.Header style={titleStyle}><p style={pStyle}>{paper.title.rendered}</p></Card.Header>
                        <Card.Description style={contentStyle}>
                            {truncatedContent}
                        </Card.Description>
                    </Card.Content>
                    {paper.downloadLink !== undefined ? (
                        <Card.Content style={iconStyle} extra>
                        <a href={`http://localhost:3001/download?fileName=${fileName}`}
                        download>
                            <Icon style={this.state.isPdfHovered ? iconStyle : hoveredIconStyle}
                                name="big file pdf outline"
                                onMouseOver={this.hoverUnHover}
                                onMouseOut={this.hoverUnHover}
                            /></a>
                        </Card.Content>
                    ) : null}
                </Card>} />
        );
    }
}

export default WhitePaper;
