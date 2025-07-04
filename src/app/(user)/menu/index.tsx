import { View, FlatList, Platform, SafeAreaView, ActivityIndicator, Text } from 'react-native';



import { ProductListItems } from '@components/ProductListItems';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useProductLIst } from '@/src/api/products';






export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductLIst();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    )
  }
  if (error) {
    return <Text>Failed to fetch products</Text>
  }


  return (
    <View>
      {/* <ProductListItems product={products[0]} />
      <ProductListItems product={products[4]} /> */}
      <FlatList data={products} renderItem={({ item }) => <ProductListItems product={item} />} numColumns={2} contentContainerStyle={{ gap: 10, padding: 10, }} columnWrapperStyle={{ gap: 10 }} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

