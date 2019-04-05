import React, { Component } from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';
import ReactHtmlParser from 'react-html-parser';

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
      <Modal trigger={trigger}>
        <Modal.Header>Det digitala Paraplyet</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="https://react.semantic-ui.com/images/avatar/large/rachel.png" />
          <Modal.Description>
            <Header>{paper.title.rendered}</Header>
            {ReactHtmlParser(paper.content.rendered)}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalPaper;
