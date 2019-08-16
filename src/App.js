import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PaletteList from './PaletteList'
import Palette from './Palette'
import seedColor from './seedColor'
import {generatePalette} from './colorHelpers'
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  console.log(savedPalettes)
  const [palettes, setPalettes] = React.useState(savedPalettes || seedColor)

  function findPalette(id){
    return palettes.find(function(palette){
      return palette.id === id
    })
  }

  function savePalette(newPalette){    
    window.localStorage.setItem('palettes', JSON.stringify([...palettes, newPalette]))
    setPalettes([...palettes, newPalette])
  }

  function deletePalette(id){
    const filtered = palettes.filter(palette => palette.id !== id)
    window.localStorage.setItem('palettes', JSON.stringify(filtered))
    setPalettes(filtered)
  }

  return (
    <div className="App">
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route exact path='/' render={(routeProps) => (
                <Page>
                  <PaletteList palettes={palettes} deletePalette={deletePalette} {...routeProps} />
                </Page>
                )}/>
              <Route exact path='/palette/new' render={(routeProps) => (
                <Page>
                  <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
                </Page>
                )} />
              <Route exact path='/palette/:id' render={(routeProps) => (
                <Page>
                <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>
                </Page>
                )}/>
              <Route 
                exact 
                path='/palette/:paletteId/:colorId' 
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(findPalette(routeProps.match.params.paletteId))} 
                    />
                  </Page>
                )} 
              />
              <Route render={() => (<Redirect to='/' />) }/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    </div>
  );
}

export default App;