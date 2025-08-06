import React from 'react';
import { Button, Layout, Text } from "@ui-kitten/components"

export const HomeScreen = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomeScreen</Text>

            <Button>Cerrar sesión</Button>
        </Layout>
    )
}
