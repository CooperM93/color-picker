import React from 'react';
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from './SingleColorPalette'
import NewPalette from './NewPalette';
import Page from './Page';
import {generatePalette} from "./colorHelper";
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



class App extends React.Component {
  constructor(props){
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = { 
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  savePalette = (newPalette) => {
    this.setState({ palettes: [...this.state.palettes, newPalette ]}, this.syncLocalStorage);
  }
  deletePalette(id){
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  render() {
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route 
                exact
                path="/palette/new" render={(routeProps) => (
                  <Page>
                    <NewPalette 
                      savePalette={this.savePalette} 
                      palettes={seedColors} 
                      {...routeProps} 
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path="/" 
                render={(routeProps) => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps} 
                    />
                  </Page>
                )}
              />
              <Route 
                exact 
                path="/palette/:id" 
                render={routeProps => (
                  <Page>
                    <Palette 
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )} 
                    />
                  </Page>
                )}
              />
              <Route 
                exact
                path="/palette/:paletteId/:colorId" 
                render={routeProps => (
                  <Page>
                    <SingleColorPalette 
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )} 
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )} 
              />
              <Route  
                render={(routeProps) => (
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps} 
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    );
  }
}

export default App;
