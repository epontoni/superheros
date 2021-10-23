import { Container, Row } from 'react-bootstrap'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


import { Route, Switch } from 'wouter'
import SearchResultsPage from './pages/SearchResultsPage'
import DetailPage from './pages/DetailPage'
import NotFound from './pages/NotFound'
import LogoutPage from './pages/LogoutPage'
import AppAlert from './components/AppAlert'

function App() {
  return (
      <>
        <Header />
        <Container fluid className='App'>
            <Row>
                <AppAlert />
            </Row>
            
            <Row style={{maxWidth: '1200px', margin: '0 auto'}}>
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
            </Row>
        </Container>
      </>
    
  );
}

export default App;
