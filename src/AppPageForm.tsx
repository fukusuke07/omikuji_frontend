import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import { useHistory } from "react-router-dom"

import Header from './pages/Header'
import Mypage from './pages/Mypage'
import Home from './pages/Home'
import Result from './pages/Result'
import Measure from './pages/Measure'
import ErrorPage from './pages/ErrorPage'
import DeleteUserPage from './pages/DeleteUserPage'
import SignOutPage from './pages/SignOutPage'

import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"

import Footer from "./pages/Footer";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import Box from '@mui/material/Box';

import Tatami from './assets/images/japanese-paper_00148.png'
import WashiBack from './assets/images/japanese-paper_00559.png'

import { User } from "./interfaces/index"

import { Score } from "./interfaces/index"

import { AppHandler, MappedProps } from './stores/containers/AppContainer';

interface OwnProps {
  loading: boolean
  user: User | null 
  score: Score | null 
  error: Error | null
}
type Props =  OwnProps & AppHandler

export default function AppPageForm(props: MappedProps) {
  const history = useHistory();

  useEffect(() => {

    let unmounted = false
    const f = async () => {
      if(!unmounted){
        if(!props.user){
          await new Promise((resolve, reject) => {
            props.actions.fetchUserOperation({
            delay: 1500,
            promise: { resolve, reject }
          });
          }).catch(error => {
            history.push("/Error");
          })
        }

        if(!props.score){
          await new Promise((resolve, reject) => {
            props.actions.fetchScoreOperation({
            delay: 1500,
            promise: { resolve, reject }
          });
          }).catch(error => {
            history.push("/Error");
          })
            }
    }
  };
  f();
  return ()=>{ unmounted = true; };
 }, [])


  /*const Private = ({ children }: { children: React.ReactElement }) => {
    if (!props.loading) {
      if (props.user) {

        console.log("User")
        return children
      } else {

        console.log("Pls SignIn")
        return <Redirect to="/signin" />
      }
    } else {

      console.log("Is Loading")
      return <></>
    }
  }*/

  return (
    <Router>
    <div style={{
      backgroundImage: `url(${Tatami})`,
      minHeight: "100vh",
      position: "relative",
      paddingBottom: "30px",
      boxSizing: "border-box",
       }}>
    <Header loading={props.loading} user={props.user} signOut={props.actions.signOutOperation} /> 
      <Box
      position="relative" 
      margin="auto"
      maxWidth="640px"
      minHeight= "100vh"
      boxShadow=" 0 0 8px gray"
      style={{backgroundImage: `url(${WashiBack})` }}
    >
      <Switch>
            <Route exact path="/signup">
              <SignUp user={props.user} score={props.score} loading={props.loading} signUp={props.actions.signUpOperation} fetchUser={props.actions.fetchUserOperation}/>
            </Route>
            <Route exact path="/signin">
              <SignIn user={props.user} score={props.score} loading={props.loading} signIn={props.actions.signInOperation} fetchUser={props.actions.fetchUserOperation} fetchScore={props.actions.fetchScoreOperation}/>
            </Route>
            <Route exact path="/signout">
              <SignOutPage clearState={props.actions.clearStateOperation}/>
            </Route>
            <Route exact path="/Mypage">
              <Mypage user={props.user} score={props.score} loading={props.loading} updateUser={props.actions.updateUserOperation} signOut={props.actions.signOutOperation} deleteUser={props.actions.deleteUserOperation} />
            </Route>
            <Route exact path="/">
              <Home user={props.user} score={props.score} fetchScore={ props.actions.fetchScoreOperation } />
            </Route>
            <Route exact path="/Measure">
              <Measure score={props.score} user={props.user} createScore= {props.actions.createScoreOperation} updateScore= {props.actions.updateScoreOperation} />
            </Route> 
            <Route exact path="/Result" >
              <Result score={props.score} user={props.user} loading={props.loading} />
            </Route>
            <Route exact path="/Terms" >
              <Terms/>
            </Route>
            <Route exact path="/PrivacyPolicy" >
              <PrivacyPolicy/>
            </Route>
            <Route exact path="/DeleteUser" >
              <DeleteUserPage clearState={props.actions.clearStateOperation}/>
            </Route>
            <Route exact path="/Error" >
              <ErrorPage clearState={props.actions.clearStateOperation}/>
            </Route>
        </Switch>
      </Box>
      <Footer/>
    </div>
    </Router>
    
  )
}
