import sizes from './sizes'
import bg from './bg.svg'
export default {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        backgroundColor: '#2480aa',
        backgroundImage: `url(${bg})`,
         /* background by SVGBackgrounds.com */
        minHeight: '100vh',
        height: 'fit-content',
        display: 'flex',
        alginItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '50%',
        display: 'flex',
        alginItems: 'flex-start',
        flexDirection: 'column',
        [sizes.down('xl')]: {
            width: '60%'
        },
        [sizes.down('lg')]: {
            width: '80%'
        },
        [sizes.down('lg')]: {
            width: '70%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        '& a': {
            color: 'white',
            textDecoration: 'none'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 50%)'
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 100%)',            
            gridGap: '1rem',
        }
    }
}