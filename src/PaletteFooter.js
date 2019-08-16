import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'
import styles from './styles/PaletteFooterStyles'


class PaletteFooter extends Component {
    render() {
        const {paletteName, emoji, classes} = this.props
        return (           
                <footer className={classes.paletteFooter}>
                    {paletteName}
                    <span className={classes.paletteEmoji}>{emoji}</span>
                </footer>
        )
    }
}
export default withStyles(styles)(PaletteFooter)
