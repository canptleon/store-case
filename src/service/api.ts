import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { IProduct, AddProductNested, ICategories } from '../helpers/types'

const ApiClient = axios.create({
    baseURL: "https://62286b649fd6174ca82321f1.mockapi.io/case-study"
});

export const getProducts = async() => {
    let fetchedData: IProduct[] = [];

    await ApiClient
        .get<IProduct[]>("/products")
        .then((response) => {
            fetchedData = response.data;
        })

    return fetchedData;
}

export const getProductById = async(id: string) => {
    let fetchedData: IProduct = {
        avatar: "",
        category: "",
        createdAt: 0,
        description: "",
        developerEmail: "",
        id: "",
        name: "",
        price: ""
    };

    await ApiClient
        .get<IProduct>(`/products/${id}`)
        .then((response) => {
            fetchedData = response.data;
        })
    return fetchedData;
}

export const addProduct = async(data: AddProductNested, navigate: NavigateFunction) => {
    await ApiClient
        .post<AddProductNested>(`/products/`, data)
        .then((response) => {
            navigate("/homepage")
        })
}

export const deleteProduct = async(id :string) => {
    await ApiClient
        .delete(`/products/${id}`)
        .then((response) => {
        })
}

export const getCategories = async() => {
    let fetchedData: ICategories[] = [];

    await ApiClient
        .get<ICategories[]>("/categories")
        .then((response) => {
            fetchedData = response.data;
        })

    return fetchedData;
}

export const getCategoriesById = async(id: string) => {
    let fetchedData: ICategories = {
        createdAt: "",
        id: "",
        name: ""
    };

    await ApiClient
        .get<ICategories>(`/categories/${id}`)
        .then((response) => {
            fetchedData = response.data;
        })

    return fetchedData;
}