import React, { Component } from 'react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

const modalStyle = {
  border: '2px solid black',
  borderRadius: '0px',
  padding: '5%'
}

const headerStyle = {
  fontSize: '1.3em',
  fontFamily: 'Permanent Marker, cursive'
}

const titleStyle = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '1.2em',
}

const descriptionStyle = {
  fontFamily: 'Lato, sans-serif',
  fontSize: '1.2em',
}

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

class ModalPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPdfHovered: false
    };
    this.hoverUnHover = this.hoverUnHover.bind(this)
  }
  hoverUnHover() {
    this.setState({ isPdfHovered: !this.state.isPdfHovered })
  }
  /*static propTypes = {
      trigger: PropTypes.any,
      paper: PropTypes.object
  }*/

  render() {

    const { trigger, paper } = this.props;
    const fileName = paper.fileName
    return (
      <Modal trigger={trigger} style={modalStyle} closeIcon>
        <Modal.Header style={headerStyle}>Det digitala Paraplyet
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header style={titleStyle}>{paper.title.rendered}</Header>
            <div style={descriptionStyle}>
              {ReactHtmlParser(paper.content.rendered)}
            </div>
          </Modal.Description>
        </Modal.Content>
        {paper.downloadLink !== undefined && paper.slug !== undefined ? (
        <Modal.Content>
        <a href={`http://localhost:3001/download?fileName=${fileName}`}
        download>
            <Icon style={this.state.isPdfHovered ? iconStyle : hoveredIconStyle}
              name="big file pdf outline"
              onMouseOver={this.hoverUnHover}
              onMouseOut={this.hoverUnHover}
            />
          </a>
        </Modal.Content>) : null}
      </Modal>
    );
  }
}

export default ModalPaper;
