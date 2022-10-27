import './App.css';
import { Route, Router,Switch } from 'react-router-dom';
import ViewEmployee from './viewList.js';
import Header from './header.js';
import history from './history.js';
import AddEmployee from './addEmployee.js';
import ViewEmployeeDetails from './ViewEmployee';
function App() {
  return(
    <Router history={history}>
      <Header />
      <Switch>
      <Route exact path="/add-employee" component={AddEmployee} />
      <Route path="/add-employee/:id" key="edit-employee" component={AddEmployee} exact />
      <Route path="/view-employees" component={ViewEmployee} exact/>
      <Route path="/view-employee/:id" component={ViewEmployeeDetails} exact/>
      <Route path="*" component={ViewEmployee} />
      </Switch>
    </Router>
  )
}

export default App;
