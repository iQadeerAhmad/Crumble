import { Colors } from '@/src/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tables } from '../database.types';
import { defaultPizzaImage } from './ProductListItems';
import RemoteImage from './RemoteImage';

type OrderItemListItemProps = {
    item: { products: Tables<'products'> } & Tables<'order_items'>;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
    return (
        <View style={styles.container}>
            <RemoteImage
                path={item.products.image}
                fallback={defaultPizzaImage}

                style={styles.image} resizeMode='contain' />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.products.name}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
                    <Text>Size: {item.size}</Text>
                </View>
            </View>
            <View style={styles.quantitySelector}>
                <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 18,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
});

export default OrderItemListItem;