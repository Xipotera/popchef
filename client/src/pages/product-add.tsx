import React, { FunctionComponent, useState } from 'react';
import ProductForm from '../components/product-form';
import Product from '../models/product';

const ProductAdd: FunctionComponent = () => {

    const [id] = useState<number>(new Date().getTime());
    // @ts-ignore
    const [product] = useState<Product>(new Product(id));

    return (
        <div className="row">
            <h2 className="header center">Add a new product</h2>
            <ProductForm product={product} isEditForm={false}></ProductForm>
        </div>
    );
}

export default ProductAdd;
