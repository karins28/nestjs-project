import { useMutation, useQueryClient } from "@tanstack/react-query";
 import { useNotificationHandler } from "./useNotificationHandler";
import { createItem, deleteItem, updateItem } from "../apis/books";
import { AxiosError } from "axios";
import type { ICreateBookDto, IUpdateBookDto } from "../../../shared/types";

export function useUpdate() {
    const {showError, showSuccess}  =  useNotificationHandler()
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (variables: IUpdateBookDto) => {return updateItem(variables)},
          onSuccess: () => {
            showSuccess("updated book successfully")
             queryClient.invalidateQueries({queryKey: ['fetchItems']});
          },
          onError: (error: AxiosError) => {
            showError(error.message)
          }
        })
}

export function useCreate() {
     const {showError, showSuccess}  =  useNotificationHandler()
    const queryClient = useQueryClient();
       return useMutation({
           mutationFn: (variables: ICreateBookDto) => {return createItem(variables)},
         onSuccess: () => {
           showSuccess("created book successfully")
           queryClient.invalidateQueries({queryKey: ['fetchItems']});
         },
         onError: (error: AxiosError) => {
           showError(error.message)
         }
       })
}

export function useDelete() {
     const {showError, showSuccess}  =  useNotificationHandler()
    const queryClient = useQueryClient();
       return useMutation({
           mutationFn: (variables: {id: string}) => {return deleteItem(variables.id)},
         onSuccess: () => {
           showSuccess("deleted book successfully")
           queryClient.invalidateQueries({queryKey: ['fetchItems']});
         },
         onError: (error: AxiosError) => {
           showError(error.message)
         }
       })
}