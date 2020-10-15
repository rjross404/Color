import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import styles from "./styles/PaletteStyles"

class Palette extends Component {
    state = {
        level: 500,
        format: 'hex'
    }
    changeLevel = (level) => {
        this.setState({level})
    }
    changeFormat = (val) => {
        this.setState({format: val})
    }
    render() {
        const {classes} = this.props
        const {level, format} = this.state
        const {colors, paletteName, emoji, id } = this.props.palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={color.name} id={color.id} paletteId={id} showingFullPalette={true} />
        ))
        return (
            <div className={classes.palette}>
                <Navbar level={level} changeLevel={this.changeLevel}  handleChange={this.changeFormat} showingAllColors={true} />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette)