import { View, Text, Button } from 'react-native'
import React from 'react'
import { supabase } from '@/src/lib/supabase'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <Button title='Sign Out' onPress={handleSignOut} />
        </SafeAreaView>
    )
}

export default ProfileScreen