import React, { Component } from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

const modalStyle = {
  border: '2px solid black',
  borderRadius: '0px'
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

class ModalPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /*static propTypes = {
      trigger: PropTypes.any,
      paper: PropTypes.object
  }*/

  render() {
    const { trigger, paper } = this.props;
    return (
      <Modal trigger={trigger} style={modalStyle}>
        <Modal.Header style={headerStyle}>Det digitala Paraplyet</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header style={titleStyle}>{paper.title.rendered}</Header>
            <div style={descriptionStyle}>
            {ReactHtmlParser(paper.content.rendered)}
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalPaper;
