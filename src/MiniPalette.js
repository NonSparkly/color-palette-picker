import React, {PureComponent} from 'react'
import {withStyles} from '@material-ui/styles'
import styles from './styles/MiniPaletteStyles'
import DeleteIcon from '@material-ui/icons/Delete'

class MiniPalette extends PureComponent {

    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleDelete(e){
        e.stopPropagation()
        this.props.deletePalette(this.props.id)
    }

    handleClick(e){
        this.props.handleClick(this.props.id)
    }

    render(){
        const {classes, paletteName, emoji, colors} = this.props;

        const miniColorBoxes = colors.map(color => (
            <div 
                key={color.name}
                className={classes.miniColor}
                style={{backgroundColor: color.color}}
            />
        ))

        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon onClick={this.handleDelete} className={classes.deleteIcon} />
                <div className={classes.colors}>
                    {/* MINI COLOR BOXES */}
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} 
                    <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
}
}

export default withStyles(styles)(MiniPalette)