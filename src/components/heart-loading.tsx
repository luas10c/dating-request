import Lottie, { LottieComponentProps } from 'lottie-react'

import loading from '#/lottie/loading.json'

const options: LottieComponentProps = {
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
  loop: true
}

export const HeartLoading = () => {
  return (
    <div className="w-48 h-48 p-4 rounded-full">
      <Lottie {...options} className="w-full max-w-[640px]" />
    </div>
  )
}
