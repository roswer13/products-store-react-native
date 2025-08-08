import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { MyIcon } from "../../components/ui/MyIcon"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParam } from "../../navigation/StackNavigator"
import { useState } from "react"
import { useAuthStore } from "../../store/auth/useAuthStore"

interface Props extends StackScreenProps<RootStackParam, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { login } = useAuthStore()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isPosting, setIsPosting] = useState(false)
    const { height } = useWindowDimensions()

    const onLogin = async () => {
        if (form.email.length === 0 || form.password.length === 0) {
            return;
        }

        setIsPosting(true);
        const wasSuccessful = await login(form.email, form.password);
        setIsPosting(false);
        if (wasSuccessful) return;

        Alert.alert('Error', 'Usuario o contraseña incorrectos')
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category="h1">Ingresar</Text>
                    <Text category="p2">Por favor, ingrese para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                        accessoryLeft={() => <MyIcon name="email-outline" />}
                        style={{ marginBottom: 10 }} />

                    <Input
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        secureTextEntry
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        accessoryLeft={() => <MyIcon name="lock-outline" />}
                        style={{ marginBottom: 10 }} />

                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Buttons */}
                <Layout>
                    <Button
                        disabled={isPosting}
                        accessoryRight={() =>
                            <MyIcon name="arrow-forward-outline" white />}
                        onPress={onLogin}>
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
                    <Text>¿No tienes cuenta? </Text>
                    <Text
                        onPress={() => { navigation.navigate('RegisterScreen') }}
                        status="primary"
                        category="s1">
                        Crear cuenta
                    </Text>
                </Layout>


            </ScrollView>
        </Layout>
    )
}
