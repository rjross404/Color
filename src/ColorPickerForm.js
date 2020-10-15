import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color'
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import styles from "./styles/ColorPickerFormStyles"

class ColorPickerForm extends Component {
    state = {
        currentColor: 'teal',
        newColorName: ''
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
          this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
        )
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
          this.props.colors.every(
              ({color}) => color !== this.state.currentColor
          )
        )
    }
    updateCurrentColor = (newColor) => {
        this.setState({currentColor: newColor.hex})
      }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
          } 
        this.props.addNewColor(newColor)
        this.setState({newColorName:''})
    }
    render() {
        const {paletteIsFull, classes} = this.props
        const {currentColor, newColorName} = this.state
        return (
            <div className={classes.root}>
                <ChromePicker 
                    color={currentColor} 
                    onChangeComplete={this.updateCurrentColor} 
                    className={classes.picker}
                    width='100%'
                />
                <ValidatorForm 
                    onSubmit={this.handleSubmit}
                    ref='form'
                >
                    <TextValidator 
                        value={newColorName} 
                        className={classes.colorNameInput}
                        placeholder='Color Name'
                        name="newColorName"
                        onChange={this.handleChange}
                        variant='filled'
                        margin='normal'
                        validators={['required','isColorNameUnique','isColorUnique']} 
                        errorMessages={['Enter a color name','Color name must be unique','Color already used']}
                        />
                    <Button 
                        variant="contained" 
                        type='submit'
                        color="primary" 
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{backgroundColor: paletteIsFull ? 'lightgrey' : currentColor}}
                    >
                    {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>              
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm)