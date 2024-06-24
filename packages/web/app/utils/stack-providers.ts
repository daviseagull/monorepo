type HOC<T> = (
  Component: (props: T) => JSX.Element
) => (props: T) => JSX.Element

export function stackProviders<T extends {}>(
  providers: Array<HOC<T>>,
  Component: (props: T) => JSX.Element
): (props: T) => JSX.Element {
  return providers.reverse().reduce((wrappedComponent, highOrderComponent) => {
    return highOrderComponent(wrappedComponent)
  }, Component)
}
