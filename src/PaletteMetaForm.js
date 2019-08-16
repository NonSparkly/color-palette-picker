import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class PaletteMetaForm extends Component {

    render() {
        const { handleSubmit, handlePaletteNameChange, paletteName, stage, setStage, saveEmoji} = this.props
        return (
            <div>
                <Dialog open={stage === 'emoji'} onClose={() => setStage('')}>
                    <Picker
                        title='Pick a Palette Emoji'
                        onSelect={saveEmoji} 
                    />
                    <Button onClick={() => setStage('')} color="primary">
                            Cancel
                        </Button>
                        <Button 
                        variant='contained' 
                        color='primary' 
                        nowrap
                        onClick={handleSubmit}
                    >Save Palette</Button>
                </Dialog>
                
                <Dialog open={stage === 'name'} onClose={() => setStage('')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                
                    <ValidatorForm onSubmit={() => setStage('emoji')}>      
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette. Make sure it's unique!
                            </DialogContentText>      
                                    <TextValidator
                                    label='Palette Name'
                                    fullWidth
                                    margin='normal'
                                    value={paletteName} 
                                    onChange={handlePaletteNameChange}
                                    validators={['required', 'isPaletteNameUnique']}
                                    errorMessages={['Palette must have a name', 'Name is already in use']}
                                    />            
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => setStage('')} color="primary">
                            Cancel
                        </Button>
                        <Button 
                        variant='contained' 
                        color='primary' 
                        nowrap
                        type='submit'
                        >Save Palette</Button>
                        </DialogActions>
                    
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm
