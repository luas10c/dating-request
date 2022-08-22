import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import type { GetServerSideProps } from 'next'

import { supabase } from '#/lib/supabase'

import { sleep } from '#/utils/sleep'

import { HttpException } from '#/errors/http-exception'

import { HeartLoading } from '#/components/heart-loading'

const Request = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const buttonReject = useRef<HTMLButtonElement | null>(null)

  const handleAceppted = async () => {
    try {
      setLoading(true)
      await sleep(2000)
      const { data, error } = await supabase
        .from('requests')
        .update({ accepted: true })
        .eq('id', router.query.id)
        .single()

      if (error) {
        throw new HttpException(400, error.message)
      }

      router.push(`/requests/${data.id}/accepted`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const setRandomPosition = () => {
    const randomNumber = Math.round(Math.random() * 200) - 100
    const x = Math.random() < 0.5 ? -randomNumber : randomNumber
    const y = Math.random() < 0.5 ? -randomNumber : randomNumber

    if (buttonReject.current) {
      buttonReject.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[640px] max-w-[92%] min-h-[360px] px-4 rounded flex flex-col justify-center items-center">
        {loading && <HeartLoading />}
        {!loading && (
          <>
            <header className="py-4">
              <h4 className="text-zinc-700 text-center text-6xl">
                Quer namorar comigo?
              </h4>
            </header>
            <div className="py-4 flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                className="bg-zinc-200 w-full md:w-48 h-12 rounded-full"
                onClick={handleAceppted}
              >
                <span className="uppercase font-bold">Aceitar</span>
              </button>
              <button
                type="button"
                ref={buttonReject}
                onClick={setRandomPosition}
                className="bg-zinc-200 w-full md:w-48 h-12 rounded-full select-none"
              >
                <span className="uppercase font-bold ">Rejeitar</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query

  const { data } = await supabase
    .from('requests')
    .select('id, request_to, accepted')
    .eq('id', id)
    .single()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  console.log(data)
  if (data.accepted) {
    return {
      redirect: {
        destination: `/requests/${data.id}/accepted`,
        permanent: false
      }
    }
  }

  return {
    props: {
      data
    }
  }
}

export default Request
