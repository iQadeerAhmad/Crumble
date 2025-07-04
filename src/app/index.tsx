import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {
    const { session, loading, isAdmin } = useAuth()

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>)
    }
    if (!session) {
        return <Redirect href={'/sign-in'} />
    }
    if (!isAdmin) {


        return <Redirect href={'/(user)'} />

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <Link href={'/(user)'} asChild>
                <Button text="User" />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text="Admin" />
            </Link>

            <Button text="Sign out" onPress={() => { supabase.auth.signOut() }} />
        </View>
    );
};

export default index;