import { Container } from 'react-bootstrap'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


import { Route, Switch, useLocation } from 'wouter'
import SearchResultsPage from './pages/SearchResultsPage'
import DetailPage from './pages/DetailPage'
import NotFound from './pages/NotFound'
import { useDispatch } from 'react-redux'
import { logOutUser } from './actions'
import LogoutPage from './pages/LogoutPage'
//import { useSelector } from 'react-redux'

function App() {
    const dispatch = useDispatch()
    const [location, setLocation] = useLocation()
    // const isAuthenticated = useSelector(state => state.app.isAuthenticated)
  return (
      <>
        <Header />
        <Container fluid className='App d-flex justify-content-center'>
            <Switch>
                <Route
                    component={HomePage}
                    path="/"
                />
                <Route
                    component={LoginPage}
                    path="/login"
                />
                <Route
                    component={LogoutPage}
                    path="/logout"
                />
                <Route
                    path='/search/:keyword'
                    component={SearchResultsPage}
                />
                <Route
                    path='/hero/:id'
                    component={DetailPage}
                />
                <Route path="/:rest*">
                    {(params) => <NotFound params={params} />}
                </Route>
            </Switch>
        </Container>
      </>
    
  );
}

export default App;
