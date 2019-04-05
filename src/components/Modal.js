import React, { Component } from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser';

class ModalPaper extends Component {
    constructor(props){
        super(props)
        this.state = {

        };
    }
    componentDidMount(){

    }

    render(){
        return(
            <Modal trigger={this.props.trigger}>
            <Modal.Header>Det digitala Paraplyet</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
              <Modal.Description>
                <Header>{this.props.paper.title.rendered}</Header>
                {ReactHtmlParser(this.props.paper.content.rendered)}
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
    }
}

export default ModalPaper