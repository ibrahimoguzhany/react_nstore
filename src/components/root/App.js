import React from 'react';
import { Container } from 'reactstrap';
import Dashboard from './Dashboard';
import Navi from '../navi/Navi';
import { Route, Switch } from 'react-router-dom';
import CartDetail from '../cart/CartDetail';

const App = () => {
    return (
        <Container>
            <Navi />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/product" exact component={Dashboard} />
                <Route path="/cart" exact component={CartDetail} />
            </Switch>
        </Container>
    );
};

export default App;
