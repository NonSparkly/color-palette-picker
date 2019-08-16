import React, { Component } from 'react'
import {ChromePicker} from 'react-color'
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

export default class ColorPickerForm extends Component {
    render() {
        const {
            classes,
            color, 
            handleColorAdd, 
            name, 
            handleNameChange, 
            handleColorChange, 
            paletteFull
        } = this.props

        return (
            <div>
                <ChromePicker 
                    color={color} 
                    className={classes.chromePicker}
                    onChangeComplete={(newColor) => (handleColorChange(newColor.hex))} 
                />
                <ValidatorForm onSubmit={handleColorAdd} instantValidate={false}>
                    <TextValidator
                        placeholder='Color Name'
                        className={classes.colorName}
                        variant='filled'
                        margin='normal'
                        value={name}
                        onChange={handleNameChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name needs to unique', 'Color needs to be unique']}
                    />
                    
                    <Button 
                        className={classes.addColor}
                        variant='contained' 
                        type='submit'
                        color='primary' 
                        style={{backgroundColor: paletteFull ? 'grey' : color}}
                        disabled={paletteFull}
                    >{paletteFull? 'Palette Full' : 'Add Color'}</Button>
                </ValidatorForm>
            </div>
        )
    }
}
