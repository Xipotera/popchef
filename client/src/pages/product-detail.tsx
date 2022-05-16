import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Product from '../models/product';
import ProductService from '../services/product-service';
import Loader from '../components/loader';

type Params = { id: string };

const ProductsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [product, setProduct] = useState<Product|null>(null);

    useEffect(() => {
        ProductService.getProduct(+match.params.id).then(product => setProduct(product));
    }, [match.params.id]);

    return (
        <div>
            { product ? (
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <h2 className="header center">{ product.name }</h2>
                        <div className="card hoverable">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <table className="bordered striped">
                                        <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td><strong>{ product.name }</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td><strong>{ product.description }</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td><strong>{ product.price } €</strong></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-action">
                                    <Link to="/">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h4 className="center"><Loader /></h4>
            )}
        </div>
    );
}

export default ProductsDetail;
