import React from "react";

/* création du router */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Imports pages pour navigation */

import Dashboard from "./components/Dashboard";
import DashboardHistorique from "./components/DashboardHistorique";
import DashboardNotes from "./components/DashboardNotes";
import DashboardFavoris from "./components/DashboardFavoris";

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Home from "./components/Home";
import Activités from "./components/Activités";
import Théorie from "./components/Théorie"
import Welcome from "./components/Welcome";
import Cadrage from "./components/cadrage";
import Atelier from "./components/Atelier";
import ChoixActivites from "./components/Choix-Activités";
import MurStart from "./components/MurStart";
import MurParticipant from "./components/MurParticipant"


import idUser from './reducer/idUser';
import favorisList from './reducer/favoris';
import etapeSelected from  './reducer/builtAtelier';
import notesList from './reducer/notes';
import dataCadrage from './reducer/dataCadrage';
import activitiesDeclusion from "./reducer/addActivitiesToDeclusion";
import activitiesInclusion from "./reducer/addActivitiesToInclusion";
import activitiesEmergence from "./reducer/addActivitiesToEmergence";
import activitiesConvergence from "./reducer/addActivitiesToConvergence";
import codeSession from './reducer/codeSession';
import paramsMur from './reducer/paramsMur';
import nameUser from './reducer/nameUser';


const store = createStore(
  combineReducers({
    idUser,
    favorisList,
    notesList,
    dataCadrage,
    etapeSelected,
    activitiesDeclusion,
    activitiesInclusion,
    activitiesEmergence,
    activitiesConvergence,
    codeSession,
    paramsMur,
    nameUser
  })
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route path="/dashboard-favoris/:id"  component={DashboardFavoris} />
          <Route path="/dashboard-historique/:id"  component={DashboardHistorique} />
          <Route path="/dashboard-notes/:id"  component={DashboardNotes} />
          <Route path="/" exact component={Home} />
          <Route path="/activites" component={Activités} />
          <Route path="/theorie" component={Théorie} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/cadrage" component={Cadrage} />
          <Route path="/atelier" component={Atelier} />
          <Route path="/choix" component={ChoixActivites} />
          <Route path="/murstart" component={MurStart} />
          <Route path="/murparticipant" component={MurParticipant} />
        </Switch>
      </Router>
    </Provider>

  )
}


export default App
