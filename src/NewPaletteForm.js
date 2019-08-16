import React from 'react'
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ValidatorForm} from 'react-material-ui-form-validator'
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import useStyles from './styles/NewPaletteFormStyles'
import seedColors from './seedColor'

export default function PersistentDrawerLeft(props) {
  const maxColors = 20
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('purple')
  const [colors, setColors] = React.useState(seedColors[0].colors)
  const [name, setName] = React.useState('')
  const [paletteName, setPaletteName] = React.useState('')
  const [stage, setStage] = React.useState('')
  const [emoji, setEmoji] = React.useState({})
  
  var paletteFull = colors.length >= maxColors

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleColorChange(color) {
    setColor(color)
  }

  function handleColorAdd(){
    const newColor = {color: color, name: name}
    setColors([...colors, newColor])
    setName('')
  }

  function randomColor(){
    // pick random color from existing palettes
    const allColors = props.palettes.map(p => p.colors).flat()
    let rand
    let randomColor
    let isDuplicateColor = true
    function colorCheck(color) {
      return color.name === randomColor.name
    }
    while(isDuplicateColor){
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      isDuplicateColor = colors.some(colorCheck)
    }

    // add random color to array
    setColors([...colors, randomColor])
  }

  function clearPalette(){
    setColors([])
  }

  function handleNameChange(evt){
    setName(evt.target.value)
  }

  function handlePaletteNameChange(evt){
    setPaletteName(evt.target.value)
  }

  function saveEmoji(emoji){
    setEmoji(emoji.native)
  }

  function handleSubmit(){
    let newName = paletteName
    setStage('')
    const newPalette = {
      emoji: emoji,
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    }
    props.savePalette(newPalette)
    props.history.push('/palette/' + newPalette.id)
  }

  function handleDelete(colorName){
    setColors(colors.filter(color => color.name !== colorName))
  }

  function onSortEnd({oldIndex, newIndex}){
    const oldColors = colors
    console.log(oldIndex, newIndex)
    console.log(arrayMove(oldColors, oldIndex, newIndex))
    setColors(arrayMove(oldColors, oldIndex, newIndex))
  }

  ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
    return colors.every(({name}) => (name.toLowerCase() !== value.toLowerCase()))
  })

  ValidatorForm.addValidationRule('isColorUnique', (value) => {
    const newColor = color;
    return colors.every(({color}) => color !== newColor)
  })

  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    return props.palettes.every(palette => palette.paletteName !== paletteName)
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PaletteFormNav 
        open={open} 
        classes={classes}
        palettes={props.palettes}
        paletteName={paletteName}        
        stage={stage}
        setStage={setStage}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        handlePaletteNameChange={handlePaletteNameChange}
        saveEmoji={saveEmoji}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <Divider />
        <div className={classes.drawerContainer}>
          <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button 
              className={classes.button}
              variant='contained' 
              color='secondary' 
              onClick={clearPalette}
            >
              Clear Palette
            </Button>

            <Button 
              className={classes.button}
              variant='contained' 
              color='primary' 
              onClick={randomColor} 
              disabled={paletteFull}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm 
            classes={classes}
            color={color}
            handleColorAdd={handleColorAdd}
            name={name}
            handleNameChange={handleNameChange}
            handleColorChange={handleColorChange}
            paletteFull={paletteFull}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={colors} 
            handleDelete={handleDelete} 
            onSortEnd={onSortEnd}
            distance={20}
            axis='xy' />
      </main>
    </div>
  );
}