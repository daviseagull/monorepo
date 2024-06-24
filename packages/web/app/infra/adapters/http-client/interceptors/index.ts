import { useResponseError } from './response-error'
import { useResponseSuccessful } from './response-successful'

export function useNetworkInterceptor() {
  const onResponseError = useResponseError()
  const onResponseSuccessful = useResponseSuccessful()

  return { onResponseError, onResponseSuccessful }
}
