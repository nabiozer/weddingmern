import { Route, Switch } from "react-router-dom";

import React,{useState,useEffect} from 'react'
import AdminPage from "./admin/pages/AdminPage";
import "./App.css";

import HomePage from "./home/HomePage";
import PackagesPage from "./package/pages/PackagesPage";

import ProfilePage from "./user/pages/ProfilePage";
import LoginPage from "./user/pages/LoginPage";
import MainHeader from "./shared/components/Navigation/MainHeader";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Footer from "./shared/components/Footer";
import Loader from "./shared/components/Loader"
import RegisterPage from "./user/pages/RegisterPage";

import AlbumForm from "./user/components/AlbumForm";
import PhotoForm from "./user/components/PhotoForm";
import Confirmation from "./user/components/Confirmation";
import UserList from "./admin/components/UserList";
import UserDetails from "./admin/components/UserDetails";
import PhotoList from "./admin/components/PhotoList";
import PhotoEdit from "./admin/components/PhotoEdit.js";
import AlbumPage from "./album/pages/AlbumPage";
import Expenses from "./admin/components/Expenses";





function App() {
  const [preLoader , setPreLoader] = useState(false)

  useEffect(() => {
    setPreLoader(true)
    setTimeout(() => {
      setPreLoader(false)
    },1000)
  },[])

  return (
    <>

       
      
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
       
          <Route path="/packages" exact>
            <PackagesPage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/albums" exact>
            <AlbumPage />
          </Route>
          
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/profile/albumform" exact>
            <AlbumForm />
          </Route>
          <Route path="/profile/photoform" exact>
            <PhotoForm />
          </Route>
          <Route path="/profile/confirmation" exact>
            <Confirmation />
          </Route>
          <Route path="/admin/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/admin/expenses" exact>
            <Expenses />
          </Route>
          <Route path="/admin" exact>
            <AdminPage />
          </Route>
          <Route path="/admin/userlist" exact>
            <UserList/>
          </Route>

          <Route path="/admin/photolist" exact>
            <PhotoList />
          </Route>

          <Route path="/admin/user/:id/edit" exact>
            <UserDetails />
          </Route>
          
          <Route path="/admin/photo/:id/edit" exact>
            <PhotoEdit />
          </Route>
        </Switch>
      </main>
      <Footer />
      
    </>
  );
}

export default App;
