import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/styles'
import styles from "./styles/ColorBoxStyles"

class ColorBox extends Component {
    state = {
        copied: false
    }
    changeCopyState = () => {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }
    render() {
        const {name, background, paletteId, id, showingFullPalette, classes } = this.props
        const {copied} = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState} >
                <div className={classes.colorBox} style={{background}}>
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{background}} />
                    <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
                        <h1 className={classes.textLum}>copied!</h1>
                        <p className={classes.textLum}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.textLum}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                           <span className={classes.seeMore}>MORE</span>
                        </Link>)} 
                </div>                
            </CopyToClipboard>

        )
    }
}

export default withStyles(styles)(ColorBox)