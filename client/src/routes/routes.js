import { DefaultLayout, HeaderOnly } from '~/layouts'

import Home from '~/pages/Home'
import TopViews from '~/pages/TopViews'
import Watch from '~/pages/Watch'

export const publicRoutes = [
  { path: '/', conponemt: Home, layout: DefaultLayout },
  { path: '/topviews', conponemt: TopViews, layout: DefaultLayout },
  { path: '/watch', conponemt: Watch, layout: HeaderOnly },
]

export const privateRoutes = []
