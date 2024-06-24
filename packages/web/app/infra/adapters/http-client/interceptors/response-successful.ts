import { AxiosResponse } from 'axios'

export function useResponseSuccessful() {
  async function onSuccess(response: AxiosResponse) {
    return Promise.resolve(response)
  }

  return { onSuccess }
}
