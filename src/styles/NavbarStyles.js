import sizes from './sizes'
export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '40px',
        height: '5%',
    },
    
    navLogo: {
        fontFamily: 'Roboto',
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('md')]: {
            display: 'none'
        }
    },
    
    navSlider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-rail': {
            height: '8px'
        },        
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover': {
            backgroundColor: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            top: '7px'
        },
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        [sizes.down('sm')]: {
            width: '140px'
        }
    },
    
    selectContainer: {
        width: '250px',
        marginRight: '1rem',
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}