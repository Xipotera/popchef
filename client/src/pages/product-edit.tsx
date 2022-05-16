import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProductForm from '../components/product-form';
import Product from '../models/product';
import ProductService from '../services/product-service';
import Loader from '../components/loader';


type Params = { id: string };

const ProductEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [product, setProduct] = useState<Product|null>(null);

    useEffect(() => {
        ProductService.getProduct(+match.params.id).then(product => setProduct(product));
    }, [match.params.id]);

    return (
        <div>
            { product ? (
                <div className="row">
                    <h2 className="header center">Edit { product.name }</h2>
                    <ProductForm product={product} isEditForm={true}></ProductForm>
                </div>
            ) : (
                <h4 className="center"><Loader /></h4>
            )}
        </div>
    );
}

export default ProductEdit;
