import axios, { AxiosInstance } from 'axios'

export class AxiosSingleton {
  private static instance: AxiosInstance

  private constructor() {}

  public static getInstance() {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({ baseURL: '' })
    }

    return AxiosSingleton.instance
  }
}
