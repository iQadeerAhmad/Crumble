import orders from '@/assets/data/orders'
import Colors from '@/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import OrderListItem from '@/src/components/OrderListItem'
import { OrderStatusList } from '@/src/types'
import { useLocalSearchParams, Stack } from 'expo-router'
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'

export default function OrdersDetailsScreen() {
    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

    const { data: order, isLoading, error } = useOrderDetails(id)
    const { mutate: updateOrder } = useUpdateOrder()

    const updateStatus = (status: string) => {
        updateOrder({
            id: id,
            updatedFields: { status }
        })
    }
    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>
        )
    }
    if (error || !order) {
        return <Text>Order not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 10 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            <OrderListItem order={order} />
            <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListFooterComponent={() => (
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                                <Pressable
                                    key={status}
                                    onPress={() => updateStatus(status)}
                                    style={{
                                        borderColor: Colors.light.tint,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginVertical: 10,
                                        backgroundColor:
                                            order.status === status
                                                ? Colors.light.tint
                                                : 'transparent',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                order.status === status ? 'white' : Colors.light.tint,
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </>

                )} />
        </View>
    )
}