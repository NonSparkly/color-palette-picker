import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/styles'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './styles/NavbarStyles'

class Navbar extends Component {
    render() {
        const {level, changeLevel, format, changeFormat, classes} = this.props

        return (
            <header className={classes.Navbar}>
                <div className={classes.navLogo}>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {level && 
                    <div>
                        <span>Level: {level}</span>
                        
                        <div className={classes.navSlider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900}
                                step={100}
                                onChange={changeLevel}
                            />
                        </div>
                    </div>}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={changeFormat}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
                    </Select>                    
                </div>
            </header>
        )
    }
}

export default withStyles(styles)(Navbar)
