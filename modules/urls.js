class Urls {
    constructor() {
        this.url = 'http://localhost:3000';
    }

    getAllProducts() {
        return `${this.url}/products`;
    }

    getProductByIndex(index) {
        return `${this.url}/products/${index}`;
    }

    createProduct() {
        return `${this.url}/products`;
    }

    deleteProduct(index) {
        return `${this.url}/products/${index}`;
    }

    patchProduct(index) {
        return `${this.url}/products/${index}`;
    }
}

export const urls = new Urls();
