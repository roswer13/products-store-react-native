import { Product } from '../../../domain/entities/product';
import { Layout, List, Text } from '@ui-kitten/components'
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

interface Props {
    products: Product[];
    fetchNextPage?: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const onPullToRefresh = async () => {
        setIsRefreshing(true);
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsRefreshing(false);
    }

    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <ProductCard product={item} />
            )}
            onEndReachedThreshold={0.8}
            onEndReached={fetchNextPage}
            ListFooterComponent={() => <Layout style={{ height: 150 }} />}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onPullToRefresh} />
            }
        />
    )
}
