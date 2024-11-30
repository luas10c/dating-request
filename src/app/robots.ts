import type { MetadataRoute } from 'next/types'

function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/']
      }
    ]
  }
}

export default robots
