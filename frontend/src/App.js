
import {Route,Switch} from 'react-router-dom'
import AdminPage from './admin/pages/AdminPage';
import './App.css';

import HomePage from './home/HomePage';
import PackagesPage from './package/pages/PackagesPage';
import PlacesPage from './places/pages/PlacesPage';
import ProfilePage from './user/pages/ProfilePage';
import LoginPage from './user/pages/LoginPage'



function App() {
  return (
    <>
    <Switch>
    <Route path="/" exact>
       <HomePage />
      </Route>
      <Route path="/places" exact>
        <PlacesPage />
      </Route>
      <Route path="/packages" exact>
       <PackagesPage />
      </Route>
      <Route path="/profile" exact>
       <ProfilePage />
      </Route>
      <Route path="/login" exact>
       <LoginPage
       
        />
      </Route>
      <Route path="/admin" exact>
       <AdminPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
