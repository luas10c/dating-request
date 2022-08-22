import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import Head from 'next/head'

import { FormDating } from '#/components/form-dating'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const session = router.asPath.match(
      /\/#access_token=(.*)&expires_in=(.*)&provider_token=(.*)&refresh_token=(.*)/
    )
    if (session) {
      const [access_token] = router.asPath
        .replace(
          /\/#access_token=(.*)&expires_in=(.*)&provider_token=(.*)&refresh_token=(.*)/,
          '$1'
        )
        .split(',')

      setCookie({}, 'access_token', decodeURI(access_token))

      router.push('/')
    }
  }, [router])

  return (
    <div className="h-screen flex items-center">
      <Head>
        <title>Dating Request</title>
        <meta name="theme-color" content="#E4E4E7" />
      </Head>
      <div className="bg-zinc-100 rounded-md w-[640px] max-w-[92%] py-4 mx-auto">
        <FormDating />
      </div>
    </div>
  )
}

export default Home
