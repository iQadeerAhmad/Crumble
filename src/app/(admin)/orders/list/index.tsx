import { Text, FlatList, SafeAreaView, ActivityIndicator } from "react-native"
import OrderListItem from "@/src/components/OrderListItem"
import { useAdminOrderLIst } from "@/src/api/orders"
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useAdminOrderLIst({ archived: false });

    useInsertOrderSubscription()

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>
        )
    }
    if (error) {
        return <Text>Failed to fetch</Text>
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }} />
    )
}