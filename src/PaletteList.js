import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles'
import { ListItemText } from '@material-ui/core';

class PaletteList extends Component {
    constructor(props){
        super(props)
        this.state={
            deleteDialogOpen: false
        }
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.goToPalette = this.goToPalette.bind(this)
    }

    openDialog(id){
        this.setState({deleteDialogOpen: true, paletteToRemove: id})
    }
    closeDialog(){
        this.setState({deleteDialogOpen: false, paletteToRemove: ''})
    }

    goToPalette(id){
        this.props.history.push('/palette/' + id)
    }

    render() {
        const {palettes, classes, deletePalette} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                <MiniPalette 
                                    {...palette} 
                                    key={palette.id}
                                    id={palette.id}
                                    deletePalette={this.openDialog}
                                    handleClick={this.goToPalette} />    
                                
                            </CSSTransition>                    
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={this.state.deleteDialogOpen} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete this palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={() => {
                                deletePalette(this.state.paletteToRemove)
                                this.closeDialog()
                                }}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                    <CheckIcon></CheckIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                    <CloseIcon></CloseIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList)