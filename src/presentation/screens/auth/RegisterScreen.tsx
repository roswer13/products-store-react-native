import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParam } from "../../navigation/StackNavigator"

interface Props extends StackScreenProps<RootStackParam, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { height } = useWindowDimensions()
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.30 }}>
                    <Text category="h1">Crear cuenta</Text>
                    <Text category="p2">Por favor, crea una cuenta para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder="Nombre completo"
                        accessoryLeft={() => <MyIcon name="person-outline" />}
                        style={{ marginBottom: 10 }} />

                    <Input
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        accessoryLeft={() => <MyIcon name="email-outline" />}
                        style={{ marginBottom: 10 }} />

                    <Input
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        secureTextEntry
                        accessoryLeft={() => <MyIcon name="lock-outline" />}
                        style={{ marginBottom: 10 }} />

                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Buttons */}
                <Layout>
                    <Button
                        accessoryRight={() =>
                            <MyIcon name="arrow-forward-outline" white />}
                        onPress={() => { }}>
                        Ingresar
                    </Button>
                </Layout>

                {/* Information for create account */}
                <Layout style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 80,
                }}>
                    <Text>¿Ya tienes una cuenta? </Text>
                    <Text
                        onPress={() => { navigation.goBack() }}
                        status="primary"
                        category="s1">
                        Iniciar sesión
                    </Text>
                </Layout>


            </ScrollView>
        </Layout>
    )
}
