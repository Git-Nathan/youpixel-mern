import { DefaultLayout } from '~/layouts'

import Home from '~/pages/Home'

export const publicRoutes = [
  { path: '/', conponemt: Home, layout: DefaultLayout },
]

export const privateRoutes = []
