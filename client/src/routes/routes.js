import { DefaultLayout, HeaderOnly } from '~/layouts'

import Home from '~/pages/Home'
import TopViews from '~/pages/TopViews'
import Watch from '~/pages/Watch'
import StudioVideos from '~/pages/StudioVideos'
import StudioLayout from '~/layouts/StudioLayout'
import StudioPending from '~/pages/StudioPending'
import Approval from '~/pages/Approval'
import Channel from '~/pages/Channel'

export const publicRoutes = [
  { path: '/', conponemt: Home, layout: DefaultLayout },
  { path: '/topviews', conponemt: TopViews, layout: DefaultLayout },
  { path: '/watch', conponemt: Watch, layout: HeaderOnly },
  { path: '/channel/:id', conponemt: Channel, layout: DefaultLayout },
]

export const privateRoutes = [
  {
    path: '/studio/videos/upload',
    conponemt: StudioVideos,
    layout: StudioLayout,
  },
  {
    path: '/studio/videos/pending',
    conponemt: StudioPending,
    layout: StudioLayout,
  },
  {
    path: '/studio/videos/approval',
    conponemt: Approval,
    layout: StudioLayout,
  },
]
