import type { IBook, ICreateBookDto, IPaginatedBook, IUpdateBookDto } from '../../../shared/types'
import { ROUTE_URL } from "../utils/constants";
import api from './axiosConfig'

export const ROUTE = ROUTE_URL+'/books'

export const fetchItems = (page?: number): Promise<IPaginatedBook> => {
    return api({
        method: 'GET',
        url: ROUTE,
        params: {page}
      }).then(res=>res.data)
};

export const fetchBook = (id: string):Promise<IBook> => {
    return api({
        method: 'GET',
        url: ROUTE +'/'+ id,
      });
};

export const updateItem = (book:IUpdateBookDto) => {
    return api({
        url: ROUTE + '/'+ book.id,
        method: 'PUT',
        data: book,
      });
};

export const createItem = (task:ICreateBookDto) => {
    return api({
        method: 'POST',
        data: task,
        url: ROUTE,
      });};


export const deleteItem = (id: string) => {
    return api({
        url: ROUTE + '/'+ id,
        method: 'DELETE'
      });};