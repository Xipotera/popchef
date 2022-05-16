import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Product from '../models/product';
import ProductService from '../services/product-service';

type Props = {
    product: Product,
    isEditForm: boolean
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    name: Field,
    description: Field,
    price: Field,
}

const ProductForm: FunctionComponent<Props> = ({product, isEditForm}) => {

    const history = useHistory();

    const [form, setForm] = useState<Form>({
        name: { value: product.name, isValid: true },
        description: { value: product.description, isValid: true },
        price: { value: product.price, isValid: true },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField});
    }

    const validateForm = () => {
        let newForm: Form = form;

        // Validator name
        if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du produit est requis (1-25).';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }

        // Validator price
        if(!/^[0-9]{1,3}$/.test(form.price.value)) {
            const errorMsg: string = 'Le prix du produit est compris entre 0 et 999.';
            const newField: Field = {value: form.price.value, error: errorMsg, isValid: false};
            newForm = { ...newForm, ...{ price: newField } };
        } else {
            const newField: Field = { value: form.price.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ price: newField } };
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.price.isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if(isFormValid) {
            product.name = form.name.value;
            product.description = form.description.value;
            product.price = form.price.value;
            isEditForm ? updateProduct() : addProduct();
        }
    }

    const isAddForm = (): boolean => {
        return !isEditForm;
    }

    const addProduct = () => {
        ProductService.addProduct(product).then(() => history.push(`/products`));
    }

    const updateProduct = () => {
        ProductService.updateProduct(product).then(() => history.push(`/products/${product.id}`));
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Product name */}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" name="name" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                                    {/* error */}
                                    {form.name.error &&
                                      <div className="card-panel red accent-1">
                                          {form.name.error}
                                      </div>}
                                </div>
                                {/* Product description */}
                                <div className="form-group">
                                    <label htmlFor="hp">Description</label>
                                    <input id="name" type="text" name="description" className="form-control" value={form.description.value} onChange={e => handleInputChange(e)}></input>
                                    {/* error */}
                                    {/*{form.price.error &&*/}
                                    {/*    <div className="card-panel red accent-1">*/}
                                    {/*      {form.price.error}*/}
                                    {/*    </div>}*/}
                                </div>
                                {/* Product hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Price</label>
                                    <input id="hp" type="number" name="price" className="form-control" value={form.price.value} onChange={e => handleInputChange(e)}></input>
                                    {/* error */}
                                    {form.price.error &&
                                      <div className="card-panel red accent-1">
                                          {form.price.error}
                                      </div>}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;
