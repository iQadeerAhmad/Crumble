import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'
import { defaultPizzaImage } from '@/src/components/ProductListItems'



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
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage resizeMode='contain'
        style={styles.image}
        path={product?.image}
        fallback={defaultPizzaImage}
      />

      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size)
            }}
            style={[styles.size,
            {
              backgroundColor: selectedSize === size ? 'gainsboro' : 'white'
            }
            ]} key={size}>

            <Text style={[styles.sizeText,
            {
              color: selectedSize === size ? 'black' : 'gray'
            }
            ]}  >{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart' />
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
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  }
})

export default ProductDetailsScreen