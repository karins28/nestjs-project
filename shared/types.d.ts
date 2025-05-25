export interface ICreateBookDto {
    name: string;
    author: string;
    publishedYear?: number;
}
export interface IBook extends ICreateBookDto {
    id: string;
    createdAt: Date;
}

export interface IUpdateBookDto extends Partial<IBook> {
}

