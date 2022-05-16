import React, { FunctionComponent, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Product from '../models/product';
import ProductService from '../services/product-service';
import { Link } from 'react-router-dom';

const ProductList: FunctionComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const history = useHistory();

    useEffect(() => {
        ProductService.getProducts().then(products => setProducts(products));
    }, []);

    const goToProduct = (id: number) => {
        history.push(`/products/${id}`);
    }

    const editProduct = (id: number) => {
        history.push(`/products/edit/${id}`);
    }

    return (
        <div>
            <h1 className="center">List of products</h1>
            <div className="container">
                <div className="row">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price} €</td>
                                <td>
                                    <a className="btn-floating btn-small waves-effect waves-light blue" onClick={() => goToProduct(product.id)}><i
                                        className="material-icons">visibility</i></a>&nbsp;
                                    <a className="btn-floating btn-small waves-effect waves-light green" onClick={() => editProduct(product.id)}><i
                                        className="material-icons">edit</i></a>&nbsp;
                                </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>
                </div>
            </div>
            <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
                  style={{position: 'fixed', bottom: '25px', right: '25px'}}
                  to="/product/add">
                <i className="material-icons">add</i>
            </Link>
        </div>
    );
}

export default ProductList;
