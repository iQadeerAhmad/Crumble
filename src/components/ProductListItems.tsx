import { StyleSheet, Image, Pressable } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import Colors from '@/constants/Colors';

import { Link, useSegments } from 'expo-router';
import { Tables } from '../types';
import RemoteImage from './RemoteImage';

type ProductListItemsProps = {
  product: Tables<'products'>;
}


export const ProductListItems = ({ product }: ProductListItemsProps) => {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}

          style={styles.image} resizeMode='contain' />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>

      </Pressable>
    </Link>
  )
}
export const defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"



const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',


  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },

  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',

  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});
