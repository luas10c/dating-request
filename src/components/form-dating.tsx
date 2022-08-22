import { useState } from 'react'
import { useForm, useController } from 'react-hook-form'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'

import { create } from '#/validations/dating/create'

import { sleep } from '#/utils/sleep'

import { supabase } from '#/lib/supabase'

import { HttpException } from '#/errors/http-exception'

import { HeartLoading } from './heart-loading'

export const FormDating = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(create)
  })
  const email = useController({
    name: 'email',
    control,
    defaultValue: ''
  })
  const requestFrom = useController({
    name: 'request_from',
    control,
    defaultValue: ''
  })
  const requestTo = useController({
    name: 'request_to',
    control,
    defaultValue: ''
  })

  const onSubmit = async (params) => {
    try {
      setLoading(true)
      const { email, request_to, request_from } = params
      await sleep(2000)
      const { data, error } = await supabase
        .from<any>('requests')
        .insert({ email, request_to, request_from })
        .single()
      if (error) {
        throw new HttpException(400, error.message)
      }

      router.push(`requests/${data.id}`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {loading && <HeartLoading />}
      {!loading && (
        <div className="w-full">
          <h2 className="text-center text-zinc-800 pb-6 text-2xl">
            Dating Request
          </h2>
          <fieldset className="w-full px-6">
            <legend className="sr-only">Dating Request Fields</legend>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="max-w-[420px] mx-auto py-2">
                <label
                  htmlFor="request_from"
                  className="uppercase font-bold text-sm text-zinc-500"
                >
                  Email
                </label>
                <input
                  type="text"
                  {...email.field}
                  id="request_from"
                  className="w-full h-[44px] p-0 m-0 px-2 bg-transparent border-2 border-zinc-300 rounded outline-none focus:border-red-500 transition-colors"
                  placeholder="Email@example.com"
                />
                <span className="text-red-400 uppercase font-bold text-sm py-2">
                  {email.fieldState.isTouched &&
                    email.fieldState.error?.message}
                </span>
              </div>
              <div className="max-w-[420px] mx-auto py-2">
                <label
                  htmlFor="request_from"
                  className="uppercase font-bold text-sm text-zinc-500"
                >
                  De
                </label>
                <input
                  type="text"
                  {...requestFrom.field}
                  id="request_from"
                  className="w-full h-[44px] p-0 m-0 px-2 bg-transparent border-2 border-zinc-300 rounded outline-none focus:border-red-500 transition-colors"
                  placeholder="Fernando"
                />
                <span className="text-red-400 uppercase font-bold text-sm py-2">
                  {requestFrom.fieldState.isTouched &&
                    requestFrom.fieldState.error?.message}
                </span>
              </div>
              <div className="max-w-[420px] mx-auto py-2">
                <label
                  htmlFor="request_to"
                  className="uppercase font-bold text-sm text-zinc-500"
                >
                  Para
                </label>
                <input
                  type="text"
                  {...requestTo.field}
                  id="request_to"
                  className="w-full h-[44px] p-0 m-0 px-2 bg-transparent border-2 border-zinc-300 rounded outline-none focus:border-red-500 transition-colors"
                  placeholder="Fernanda"
                />
                <span className="text-red-400 uppercase font-bold text-sm py-2">
                  {requestTo.fieldState.isTouched &&
                    requestTo.fieldState.error?.message}
                </span>
              </div>
              <div className="flex items-center justify-center py-4">
                <button
                  type="submit"
                  className="bg-zinc-100 border border-zinc-300 w-48 h-12 rounded-lg outline-none flex items-center justify-center"
                >
                  <span className="uppercase font-bold text-md">
                    Criar pedido
                  </span>
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  )
}
