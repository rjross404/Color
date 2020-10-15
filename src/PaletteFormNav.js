import React, { Component } from 'react'
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import PaletteMetaForm from './PaletteMetaForm'
import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    state = {
        formShowing: false
    }
    showForm = () => {
        this.setState({formShowing: true})
    }
    hideForm = () => {
        this.setState({formShowing: false})
    }
    render() {
        const {formShowing} = this.state
        const {classes, open, palettes, handleSubmit} = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                color='default'
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.NavBtns}>
                    <Link to="/" className={classes.link}>
                        <Button 
                            variant='contained' 
                            className={classes.button}
                            color='secondary'>
                            Go Back
                        </Button>
                    </Link>
                    <Button 
                        variant="contained" 
                        color="primary"
                        className={classes.button}
                        onClick={this.showForm}>
                        Save
                    </Button>                     
                </div>
                </AppBar>
                {formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} /> }                
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);