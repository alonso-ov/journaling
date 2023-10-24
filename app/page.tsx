import { BookHeart } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export default function Home() {


  return (
    <main className="w-screen h-screen">
      <nav className="flex justify-between w-full items-center px-12 py-8 h-1/6 [&>*]:h-fit">
        <BookHeart />
        <h1>Journaling</h1>
        <a href="/login" className="p-2 transition-colors border rounded-md hover:bg-black hover:text-white">Login</a>
      </nav>
      <Separator />
      <section className="flex flex-col items-center justify-center w-full h-5/6">
        <h2 className="text-2xl font-bold">Welcome to Journaling</h2>
        <p className="text-xl">A simple journaling app</p>
      </section>
    </main>
  )
}