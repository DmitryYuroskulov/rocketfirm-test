import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const ACCESS = 'KbgXK63o9IfQO3BgUS72KLqrjSURtY054ghTsMCj-bU'
const BASE_URL = 'https://api.unsplash.com'

class HttpClass {
    provider: AxiosInstance

    constructor(baseURL: string) {
        this.provider = axios
        this.provider.defaults.baseURL = baseURL
        this.provider.defaults.headers['Content-Type'] = 'application/json'
        this.provider.defaults.headers['Authorization'] = `Client-ID ${ACCESS}`
    }

    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.provider.get(url, config)
    }
}

const http = new HttpClass(BASE_URL)

export class ApiRepository {
    constructor() {}

    async getImages(page: number): Promise<Record<string, unknown>> {
        const { data } = await http.get('/photos', {
            params: {
                page,
            },
        })

        return data
    }

    async searchImages(page: number, query: string): Promise<Record<string, unknown>[] | []> {
        const { data } = await http.get('/search/photos', {
            params: {
                query,
                page,
            },
        })

        return data.results
    }
}
