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
                                <PaperTitle>{paper.title.rendered}</PaperTitle>
                                <PaperContent>{ReactHtmlParser(paper.content.rendered)}</PaperContent>
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
const PaperTitle = styled.div`
  color: black;
  font-size: calc(10px + 1vmin);
  font-family: 'Playfair Display', serif;
`

const PaperContent = styled.div`
  color: black;
  font-size: calc(10px + 1vmin);
  font-family: 'Lato', sans-serif;
`

export default Reader;