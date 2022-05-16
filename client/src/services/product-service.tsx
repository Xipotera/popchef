import Product from "../models/product";

export default class ProductService {

    static products: Product[] = [];

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

    static getProducts(): Promise<Product[]> {
        if (this.isDev) {
            return fetch('http://localhost:3000/products')
                .then(response => response.json())
                .catch(error => this.handleError(error));
        }

        return new Promise(resolve => {
            resolve(this.products);
        });
    }

    static getProduct(id: number): Promise<Product|null> {
        if(this.isDev) {
            return fetch(`http://localhost:3000/products/${id}`)
                .then(response => response.json())
                .then(data => this.isEmpty(data) ? null : data)
                .catch(error => this.handleError(error));
        }

        return new Promise(resolve => {
            // @ts-ignore
            resolve(this.products.find(product => id === product.id));
        });
    }

    static addProduct(product: Product): Promise<Product> {
        if(this.isDev) {
            return fetch(`http://localhost:3000/products`, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: { 'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .catch(error => this.handleError(error));
        }

        return new Promise(resolve => {
            this.products.push(product);
            resolve(product);
        });
    }

    static updateProduct(product: Product): Promise<Product> {
        if(this.isDev) {
            return fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'PATCH',
                body: JSON.stringify(product),
                headers: { 'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .catch(error => this.handleError(error));
        }

        return new Promise(resolve => {
            const { id } = product;
            const index = this.products.findIndex(product => product.id === id);
            this.products[index] = product;
            resolve(product);
        });
    }

        static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}
