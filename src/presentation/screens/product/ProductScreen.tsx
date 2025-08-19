import { useRef } from 'react';

import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components'

import { MainLayout } from '../../layouts/MainLayout'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParam } from '../../navigation/StackNavigator';
import { LoadingScreen } from '../loading/LoadingScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { ProductImages } from '../../components/products/ProductImages';

import { getProductById, updateCreateProducts } from '../../../actions/products';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];


interface Props extends StackScreenProps<RootStackParam, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {
    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();
    const queryClient = useQueryClient();

    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: async () => {
            return await getProductById(productIdRef.current);
        },
    });

    const mutation = useMutation({
        mutationFn: async (product: Product) => {
            return await updateCreateProducts({ ...product, id: productIdRef.current });
        },
        onSuccess: (data: Product) => {
            productIdRef.current = data.id;
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['product', data.id] });
        },
    });

    if (!product) {
        return (<LoadingScreen />);
    }

    return (
        <Formik
            initialValues={product}
            onSubmit={mutation.mutate}
        >
            {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                <MainLayout
                    title={values.title}
                    subtitle={`Price: $${values.price}`}
                >
                    <ScrollView style={{ flex: 1 }}>

                        {/* Product images */}
                        <Layout style={{ alignItems: 'center', marginVertical: 10, justifyContent: 'center' }}>
                            <ProductImages images={values.images} />
                        </Layout>

                        {/* Forms */}
                        <Layout style={{ padding: 20 }}>
                            <Input
                                label='Title'
                                style={{ marginVertical: 5 }}
                                onChangeText={handleChange('title')}
                                value={values.title}
                            />
                            <Input
                                label='Slug'
                                value={values.slug}
                                style={{ marginVertical: 5 }}
                                onChangeText={handleChange('slug')}
                            />
                            <Input
                                label='Description'
                                value={values.description}
                                onChangeText={handleChange('description')}
                                multiline
                                numberOfLines={5}
                                style={{ marginVertical: 5 }}
                            />
                        </Layout>

                        <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                            <Input
                                label='Price'
                                value={values.price.toString()}
                                onChangeText={handleChange('price')}
                                style={{ flex: 1 }}
                                keyboardType='numeric'
                            />
                            <Input
                                label='Inventario'
                                value={values.stock.toString()}
                                onChangeText={handleChange('stock')}
                                style={{ flex: 1 }}
                                keyboardType='numeric'
                            />
                        </Layout>

                        {/* Selectors */}
                        <ButtonGroup
                            size='small'
                            style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                            appearance='outline'>
                            {
                                sizes.map((size) => (
                                    <Button
                                        onPress={() => setFieldValue(
                                            'sizes',
                                            values.sizes.includes(size)
                                                ? values.sizes.filter(s => s !== size)
                                                : [...values.sizes, size]
                                        )}
                                        key={size}
                                        style={{
                                            flex: 1,
                                            backgroundColor: values.sizes.includes(size)
                                                ? theme['color-primary-200']
                                                : undefined,
                                        }}
                                    >{size}</Button>
                                ))
                            }
                        </ButtonGroup>

                        <ButtonGroup
                            size='small'
                            style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                            appearance='outline'>
                            {
                                genders.map((gender) => (
                                    <Button
                                        onPress={() => setFieldValue('gender', gender)}
                                        key={gender}
                                        style={{
                                            flex: 1,
                                            backgroundColor: values.gender.startsWith(gender)
                                                ? theme['color-primary-200']
                                                : undefined,
                                        }}
                                    >{gender}</Button>
                                ))
                            }
                        </ButtonGroup>

                        {/* Save Button */}
                        <Button
                            accessoryLeft={<MyIcon name='save-outline' white />}
                            style={{ margin: 15 }}
                            disabled={mutation.isPending}
                            onPress={() => handleSubmit()}
                        >Guardar</Button>

                        {/*
                        <Text>{JSON.stringify(values, null, 2)}</Text>
                        */}

                        <Layout style={{ height: 200 }}>
                        </Layout>

                    </ScrollView>
                </MainLayout>
            )
            }
        </Formik>
    )
}
