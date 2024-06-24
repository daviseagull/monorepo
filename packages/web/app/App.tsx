import { useEffect } from 'react'
import { injectSessionViewModel } from './context/session/session'
import { httpClient } from './infra/adapters/http-client'
import { useNetworkInterceptor } from './infra/adapters/http-client/interceptors'
import { Home } from './pages/Home'
import { stackProviders } from './utils/stack-providers'

function App() {
  const networkInterceptor = useNetworkInterceptor()

  useEffect(() => {
    httpClient.interceptors.response.use(
      networkInterceptor.onResponseSuccessful.onSuccess,
      networkInterceptor.onResponseError.onFailure
    )
  }, [])

  return <Home />
}

export default stackProviders([injectSessionViewModel], App)
