import { Brand } from '#/components/atoms/brand'

async function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <div className="flex flex-col space-y-4">
        <header className="flex justify-center py-8 h-fit">
          <Brand width={64} height={48} />
        </header>
      </div>
      <div className="flex-1 flex items-center"></div>
    </section>
  )
}

export default Home
