import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, ActivityIndicator, } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useProduct } from '@/src/api/products'
import { defaultPizzaImage } from '@/src/components/ProductListItems'
import RemoteImage from '@/src/components/RemoteImage'



const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const { data: product, error, isLoading } = useProduct(id)

  const { items, addItem } = useCart()

  const router = useRouter()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')


  const addToCart = () => {
    if (!product) {
      return
    }

    addItem(product, selectedSize)
    router.push('/cart')
  }

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
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Menu',
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        )
      }} />

      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage resizeMode='contain'
        style={styles.image}
        path={product?.image}
        fallback={defaultPizzaImage}
      />




      <Text style={styles.price}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,

  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },

})

export default ProductDetailsScreen