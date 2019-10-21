import React, { Component } from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard";
import './ColorBox.css';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
export class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = { copy: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
       this.setState({copy: true}, () => {
           setTimeout(() => this.setState({copy: false}), 1500);
       }) 
    }
    render() {
        const {name, background, moreUrl} = this.props;
        const {copy} = this.state;
        const isDark = chroma(background).luminance() <= 0.09;
        const isLight = chroma(background).luminance() >= 0.65;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div 
                        style={{background}} 
                        className={`copy-overlay ${copy && "show"}`}
                    />
                    <div className={`copy-msg ${copy && "show"} ${isLight && 'dark-text'}`}>
                        <h1>Copied</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDark && 'light-text'}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLight && 'dark-text'}`}>Copy</button>
                    </div>
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={`see-more ${isLight && 'dark-text'}`}>MORE</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox
