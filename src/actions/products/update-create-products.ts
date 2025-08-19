import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";


export const updateCreateProducts = async (product: Partial<Product>) => {

    product.stock = Number(product.stock);
    product.price = Number(product.price);

    if (product.id && product.id !== 'new') {
        return await updateProduct(product);
    }

    return await createProduct(product);
}

const prepareIamges = (images: string[]) => {
    return images.map(image => {
        return image.split('/').pop()
    });
}

const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...rest } = product;

    try {
        const checkedImages = prepareIamges(images);

        const { data } = await tesloApi.patch(`/products/${id}`, {
            ...rest,
            images: checkedImages,
        });

        return data;
    } catch (error) {

        if (isAxiosError(error)) {
            console.error('Error updating product:', error.response?.data);
            throw new Error(error.response?.data.message || 'Failed to update product');
        }

        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
}

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...rest } = product;

    try {
        const checkedImages = prepareIamges(images);

        const { data } = await tesloApi.post(`/products`, {
            ...rest,
            images: checkedImages,
        });

        return data;
    } catch (error) {

        if (isAxiosError(error)) {
            console.error('Error updating product:', error.response?.data);
            throw new Error(error.response?.data.message || 'Failed to update product');
        }

        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
}