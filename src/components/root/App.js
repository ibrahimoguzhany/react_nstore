import React from 'react';
import { Container } from 'reactstrap';
import Dashboard from './Dashboard';
import Navi from '../navi/Navi';
import { Route, Switch } from 'react-router-dom';
import CartDetail from '../cart/CartDetail';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';
import NotFound from '../common/NotFound';

const App = () => {
    return (
        <Container>
            <Navi />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/product" component={Dashboard} />
                <Route path="/cart" component={CartDetail} />
                <Route
                    path="/saveproduct/:productId"
                    component={AddOrUpdateProduct}
                />
                <Route path="/saveproduct/" component={AddOrUpdateProduct} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    );
};

export default App;
