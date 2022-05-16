import React, { FunctionComponent } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import ProductList from "./pages/product-list";
import PageNotFound from "./pages/page-not-found";
import ProductsDetail from "./pages/product-detail";
import ProductAdd from "./pages/product-add";
import ProductEdit from "./pages/product-edit";

const App: FunctionComponent = () => {

  return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper teal">
              <Link to="/" className="brand-logo center">PopChef</Link>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/product/add" component={ProductAdd} />
            <Route exact path="/products/edit/:id" component={ProductEdit} />
            <Route path="/products/:id" component={ProductsDetail} />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
