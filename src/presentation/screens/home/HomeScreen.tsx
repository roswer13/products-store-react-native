import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { all } from 'axios';
import { Product } from '../../../domain/entities/product';

export const HomeScreen = () => {

    /*
    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, // 1 hour
        queryFn: () => getProductsByPage(0),
    })*/

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => allPages.length,
        staleTime: 1000 * 60 * 60, // 1 hour
        queryFn: async (params) => {
            return await getProductsByPage(params.pageParam);
        }
    })

    return (
        <MainLayout
            title="Teslo Shop"
            subtitle="Find the best products here!">
            {
                isLoading
                    ? <FullScreenLoader />
                    : <ProductList
                        products={(data?.pages.flat() as Product[]) || []}
                        fetchNextPage={fetchNextPage} />
            }
        </MainLayout>
    )
}
