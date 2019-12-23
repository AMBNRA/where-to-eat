
import React from 'react';
import log from './log.png';
import Map from './Map';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from "react-router-dom";



class App extends React.Component{
  render(){ 
    return(
      <div className="homeDiv">
        <Router>
          <Switch>
            <Route path='/' exact>
              <div className="container col-md-6">
                <div className="centerDiv page1">
                  <div>
                    <img src={log}/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="button btn-1">
                      <Link to="/RandomResturant" className="link">اقترح</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/RandomResturant" Component={Map}>
              <div className="container col-md-6">
                <div className="centerDiv page2 position-absolute">
                  <Map />
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;


