import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export function Home() {
  useEffect(() => {}, [])

  return (
    <div className="bg-slate-300">
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  )
}
