import WolleClient from "./APIClient";

export const AutenticateWithEmail = (email: String) => WolleClient({
    method: "POST",
    url: '/api/admin/signin',
    data: {
        email
    }
}).then(res => res.data);
export const AutenticateWithOTP = (otp: String, key: String) => WolleClient({
    method: "POST",
    url: '/api/admin/validateOTP',
    data: {
        otp,
        key
    }
}).then(res => res.data);

export const FetchPagesOfProduct = (page: Number, count: Number, categories?: String, gender?: String) => WolleClient({
    method: "GET",
    url: `/api/product?page=${page}&count=${count}${categories != '' ? `&categories=${categories}` : ''}${gender != '' ? `&gender=${gender}` : ''}`,
}).then(res => res.data);
export const FetchPagesOfCategory = (page: Number, count: Number) => WolleClient({
    method: "GET",
    url: `/api/category?page=${page}&count=${count}`,
}).then(res => res.data);
export const FetchPagesOfMaterial = (page: Number, count: Number) => WolleClient({
    method: "GET",
    url: `/api/material?page=${page}&count=${count}`,
}).then(res => res.data);
export const FetchGroups = (searchKey:String)=>WolleClient({
    method: "GET",
    url: `/api/group/search?k=${searchKey}`
}).then(res=>res.data);
export const SearchCategory = (searchKey:String)=>WolleClient({
    method: "GET",
    url: `/api/category/search?k=${searchKey}`
}).then(res=>res.data);
export const SearchMaterial = (searchKey:String)=>WolleClient({
    method: "GET",
    url: `/api/material/search?k=${searchKey}`
}).then(res=>res.data);
export const CreateCategory = (category:any)=>WolleClient({
    method: "POST",
    url: `/api/category`,
    data: category
}).then(res=>res.data);
export const CreateMaterial = (material:any)=>WolleClient({
    method: "POST",
    url: `/api/material`,
    data: material
}).then(res=>res.data);
export const CreateGroup = (groupName:any)=>WolleClient({
    method: "POST",
    url: `/api/group`,
    data: {groupName}
}).then(res=>res.data);
export const CreateProductAPI = (product:any)=>WolleClient({
    method: "POST",
    url: `/api/product`,
    data: product
}).then(res=>res.data);