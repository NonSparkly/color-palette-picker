import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import styles from './styles/ColorBoxStyles'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class ColorBox extends Component {

    constructor(props){
        super(props);
        this.state= { copied: false}
        this.changeCopyState = this.changeCopyState.bind(this)
    }

    changeCopyState () {
        this.setState({copied:true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }

    render() {

        const {name, background, paletteId, id, showLink, classes} = this.props
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{backgroundColor: background}} className={classes.ColorBox}>
                    <div style={{backgroundColor: background}} className={`${classes.copyOverlay} ${this.state.copied && classes.showOverlay}`}/>
                    <div className={`${classes.copyMessage} ${this.state.copied && classes.showMessage}`}>
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className='Copy-container'>
                        <div className={classes.boxContent}>                 
                            <span className={classes.colorName}>{name}</span>
                        </div>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                    {showLink &&                    
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    }
                </div>
            </CopyToClipboard>
        )
    }
}


export default withStyles(styles)(ColorBox)