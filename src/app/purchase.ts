import { Category } from "./category";

export interface Purchase {
    id: string,
    name: string,
    count: number,
    price: number,
    category?: Category,
    createdAt?: Date
}
