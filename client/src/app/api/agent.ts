import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.error[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error('Access denied');
            break;
        case 500:
            router.navigate('/server-error', { state: { error: data } });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Info = {
    list: () => requests.get('infos'),
    UpdateOpenHours: (body: any) => requests.put('infos/UpdateOpenHours', body),
    UpdateAnnouncements: (body: any) => requests.put('infos/UpdateAnnouncements', body)
}

const Contact = {
    list: () => requests.get('contacts'),
    updateAddress: (body: any) => requests.put('contacts/UpdateAddress', body),
    updateContact: (body: any) => requests.put('contacts/UpdateContactData', body)
}

const Service = {
    list: () => requests.get('services'),
    details: (id: number) => requests.get(`services/${id}`),
    removeService: (id: number) => requests.delete(`Services/RemoveService_${id}`),
    addService: (body: any) => requests.post(`Services/AddNewService`, body),
    addComment: (body: any) => requests.post(`Services/AddNewComment`, body),
    updateService: (body: any) => requests.put(`Services/UpdataService`, body),
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser')
}

const agent = {
    Info,
    Contact,
    Service,
    TestErrors,
    Account
}

export default agent;