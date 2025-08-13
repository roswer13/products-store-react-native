import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { MainLayout } from '../../layouts/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../../../actions/products/get-product-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParam } from '../../navigation/StackNavigator';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];


interface Props extends StackScreenProps<RootStackParam, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {
    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();

    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: async () => {
            return await getProductById(productIdRef.current);
        },
    });

    if (!product) {
        return (<LoadingScreen />);
    }

    return (
        <Formik
            initialValues={product}
            onSubmit={(values) => {
                console.log('Form values:', values);
            }}
        >
            {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                <MainLayout
                    title={values.title}
                    subtitle={`Price: $${values.price}`}
                >
                    <ScrollView style={{ flex: 1 }}>

                        {/* Product images */}
                        <Layout>
                            <FlatList
                                data={values.images}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <FadeInImage
                                        uri={item}
                                        style={{ width: 300, height: 300, marginHorizontal: 7 }}
                                    />
                                )}
                                keyExtractor={(item) => item}
                            />
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
                            />
                            <Input
                                label='Inventario'
                                value={values.stock.toString()}
                                onChangeText={handleChange('stock')}
                                style={{ flex: 1 }}
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
                            onPress={() => console.log('Save product')}
                        >Guardar</Button>

                        <Text>{JSON.stringify(values, null, 2)}</Text>

                        <Layout style={{ height: 200 }}>
                        </Layout>

                    </ScrollView>
                </MainLayout>
            )
            }
        </Formik>
    )
}
