export interface ICreateBookDto {
    name: string;
    author: string;
    publishYear?: number;
}
export interface IBook extends ICreateBookDto {
    id: string;
    createdAt: Date;
}

export interface IUpdateBookDto extends Partial<IBook> {
}


export interface IPagination { 
    total: number;
    totalPages: number;
    limit: number;
    currentPage: number;
}

export interface IPaginatedBook {
  data: IEmployee[];
  meta: IPagination
};