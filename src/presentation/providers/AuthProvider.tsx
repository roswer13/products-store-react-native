import { useNavigation } from '@react-navigation/native'
import { RootStackParam } from '../navigation/StackNavigator'
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParam>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'authenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            }
        }
    }, [status]);

    return (<>{children} </>)
}
