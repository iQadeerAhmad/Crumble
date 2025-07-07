import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";
// import orders from "@/assets/data/orders"
import { useMyOrderLIst } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useMyOrderLIst();

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