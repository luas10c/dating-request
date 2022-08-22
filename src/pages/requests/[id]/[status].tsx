import Lottie, { LottieComponentProps } from 'lottie-react'
import type { GetServerSideProps } from 'next'

import hearts from '#/lottie/hearts.json'

const heartOptions: LottieComponentProps = {
  animationData: hearts,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
  loop: true
}

import { supabase } from '#/lib/supabase'

const Status = () => {
  return (
    <div className="bg-red-500 w-screen h-screen overflow-hidden">
      <div className="w-full max-w-[92%] mx-auto h-screen flex flex-col items-center justify-center">
        <header className="absolute z-50 py-4">
          <h4 className="text-white text-center text-6xl">
            Você escolheu a melhor opção!
          </h4>
        </header>
        <Lottie {...heartOptions} className="w-screen h-screen" />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, status } = context.query

  const { data } = await supabase
    .from('requests')
    .select('request_to,accepted')
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

  if (!data.accepted) {
    return {
      redirect: {
        destination: `/requests/${id}`,
        permanent: false
      }
    }
  }

  if (status !== 'accepted') {
    return {
      redirect: {
        destination: '/',
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

export default Status
