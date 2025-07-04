import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/AuthProvider"
import { InsertTables } from "@/src/types"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"




export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()


    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>[]) {
            const { error, data: newProduct } = await supabase.from('order_items').insert(items)
                .select()

            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        }

    })
}