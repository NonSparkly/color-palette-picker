import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles'
import Navbar from './Navbar'
import ColorBox from './ColorBox'
import { IconButton } from '@material-ui/core';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles'

class Palette extends Component {

    constructor(props){
        super(props)
        this.state = {level: 500, format: 'hex', open: false}
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }

    changeLevel(level){
        this.setState({level: level})
    }

    changeFormat(evt){
        this.setState({format: evt.target.value, open: true})
    }

    closeSnackbar() {
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {level, format} = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox            
                showingFullPalette={true}
                background={color[format]}
                showLink={true}
                name={color.name} 
                key={color.id}
                paletteId={id}
                id={color.id}
            />
        ))

        return (
            <div className={classes.Palette}>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel}
                    format={format}
                    changeFormat={this.changeFormat}
                />

                <div className={classes.Colors}>
                    {colorBoxes}
                </div>

                
                <Snackbar 
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='snackbar-message'>Format changed to {format.toLocaleUpperCase()}</span>}
                    ContentProps={{
                        'aria-describedby': 'snackbar-message'
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton 
                            onClick={this.closeSnackbar} 
                            color='inherit' 
                            key='close'
                            aria-label='close'
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette)