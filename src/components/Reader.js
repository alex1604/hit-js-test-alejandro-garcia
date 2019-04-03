import React, { Component } from 'react';
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser';

class Reader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            whitepapers: []
        }
        this.parser = new DOMParser()
    }
    componentDidMount() {
        fetch("https://humanit.se/wp-json/wp/v2/whitepaper", {  // fetch whitepapers from API
            method: 'GET'
        })
            .then(response => response.json()) // 
            .then(data => {
                this.setState({ whitepapers: data })
            })
            .catch(err => {
                // handle error
            })
    }
    render() {
        
        return (
            <ReaderContainer>
                {
                    this.state.whitepapers !== undefined ?
                        this.state.whitepapers.map(paper => {
                            return (
                            <div key={paper.id}>
                                <h4>{paper.title.rendered}</h4>
                                {ReactHtmlParser(paper.content.rendered)}
                            </div>
                            )
                        })
                        : null
                }
            </ReaderContainer>
        );
    }
}

const ReaderContainer = styled.div`
  height: 10vh;
  width: 96vw;
`

export default Reader;