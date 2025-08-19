import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";


const emptyProduct: Product = {
    id: '',
    title: '',
    description: '',
    price: 0,
    images: [],
    stock: 0,
    sizes: [],
    gender: Gender.Unisex,
    slug: '',
    tags: [],
}

export const getProductById = async (id: string): Promise<Product> => {

    if (id === 'new') {
        return { ...emptyProduct, id: 'new' };
    }

    try {
        const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data);
    }
    catch (error) {
        console.error('Failed to fetch product:', error);
        throw new Error('Failed to fetch product');
    }
}