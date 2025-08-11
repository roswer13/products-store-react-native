import React from 'react';
import { Button, Layout, Text } from "@ui-kitten/components"
import { MyIcon } from '../../components/ui/MyIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const HomeScreen = () => {

    const { logout } = useAuthStore();

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomeScreen</Text>

            <Button
                accessoryLeft={<MyIcon name="log-out-outline" />}
                onPress={logout}
            >Cerrar sesión</Button>
        </Layout>
    )
}
