
import { useOrderDetails } from '@/src/api/orders'
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import OrderListItem from '@/src/components/OrderListItem'
import { useLocalSearchParams, Stack } from 'expo-router'
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native'

export default function OrdersDetailsScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, isLoading, error } = useOrderDetails(id)
    useUpdateOrderSubscription(id)

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>
        )
    }
    if (error) {
        return <Text>Order not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 10 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            <OrderListItem order={order} />
            <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }} />
        </View>
    )
}