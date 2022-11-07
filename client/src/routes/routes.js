import { DefaultLayout } from '~/layouts'

import Home from '~/pages/Home'
import TopViews from '~/pages/TopViews'

export const publicRoutes = [
  { path: '/', conponemt: Home, layout: DefaultLayout },
  { path: '/topviews', conponemt: TopViews, layout: DefaultLayout },
]

export const privateRoutes = []
