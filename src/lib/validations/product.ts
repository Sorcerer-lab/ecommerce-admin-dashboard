import {z} from "zod";
export const productSchema=z.object({
    name:z.string().min(3,"Name is required"),
    description:z.string().min(10,"Description is required"),
    price:z.number().min(0),
    stock:z.number().min(0),
    category:z.string().min(1),
    imageUrl:z.string().optional(),
});
export type ProductInput=z.infer<typeof productSchema>;