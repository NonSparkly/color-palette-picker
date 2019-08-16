import React, { Component } from 'react'
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ValidatorForm} from 'react-material-ui-form-validator'
import {Link} from 'react-router-dom'
import PaletteMetaForm from './PaletteMetaForm';


class PaletteFormNav extends Component {

    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.palettes.every(palette => palette.paletteName !== this.props.paletteName)
          })
    }

    render() {

        const { 
            classes, 
            open,
            stage,
            setStage,
            handleDrawerOpen, 
            paletteName,
            handleSubmit,
            handlePaletteNameChange,
            saveEmoji
        } = this.props

        return (
            <div className={classes.navRoot}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create a new palette
                    </Typography>
                    
                    </Toolbar>
                    <div className={classes.navBtns}>                        
                        <Link to='/'>
                            <Button className={classes.navBtn} variant='contained' color='secondary'>
                                Go back
                            </Button>                            
                        </Link>
                        
                        <Button className={classes.navBtn} variant="contained" color="primary" onClick={() => setStage('name')}>
                            Save Palette
                        </Button>
                    </div>                    
                </AppBar>                
                <PaletteMetaForm 
                    saveEmoji={saveEmoji}
                    handleSubmit={handleSubmit}
                    stage={stage}
                    setStage={setStage}
                    handlePaletteNameChange={handlePaletteNameChange}
                    paletteName={paletteName}
                />

            </div>
        )
    }
}

export default PaletteFormNav