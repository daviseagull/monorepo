import { AxiosError } from 'axios'
import { useSessionViewModelContext } from '../../../../context/session/session'
import { logger } from '../../logger'

export enum Http_Status {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN_ACCESS = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export function useResponseError() {
  const sessionViewModel = useSessionViewModelContext()

  async function onFailure(error: AxiosError) {
    if (error.response?.status === Http_Status.BAD_REQUEST) {
      logger.error(
        'Bad Request - the request could not be processed. Please, check the submitted data and try again.',
        { endpoint: error.request.responseURL, cause: error.response.data }
      )
    } else if (error.response?.status === Http_Status.UNAUTHORIZED) {
      logger.error(
        'Unauthorized Access - the request requires user authentication. Please provide valid access credentials.',
        { endpoint: error.request.responseURL, cause: error.response.data }
      )

      sessionViewModel.signOut()
    } else if (error.response?.status === Http_Status.FORBIDDEN_ACCESS) {
      logger.error(
        "Forbidden Access - you don't have permission to access this resource. Contact the administrator if you believe this is an error.",
        { endpoint: error.request.responseURL, cause: error.response.data }
      )
    } else if (error.response?.status === Http_Status.NOT_FOUND) {
      logger.error(
        'Resource Not found - check the address for any errors and try again.',
        { endpoint: error.request.responseURL, cause: error.response.data }
      )
    } else if (error.response?.status === Http_Status.UNPROCESSABLE_ENTITY) {
      logger.error(
        'Unprocessable Entity - The request was well-formated but could no be followed due to semantic errors. Please, check the submitted data and try again later.',
        { endpoint: error.request.responseURL, cause: error.response.data }
      )
    } else if (error?.response?.status === Http_Status.INTERNAL_SERVER_ERROR) {
      logger.error(
        'Internal server error - An unexpected error occurred on the server while processing the request. Please, try again later.',
        { endpoint: error.request.responseURL, cause: error.response.data }
      )
    }

    return Promise.reject(error)
  }

  return { onFailure }
}
