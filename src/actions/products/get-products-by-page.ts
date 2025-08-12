import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";


export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {

    console.log(`Fetching products for page ${page} with limit ${limit}`);
    try {

        const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * 10}&limit=${limit}`);
        return data.map(ProductMapper.tesloProductToEntity);
    }
    catch (error) {
        console.error("Error fetching products by page:", error);
        throw new Error("Failed to fetch products");
    }
}