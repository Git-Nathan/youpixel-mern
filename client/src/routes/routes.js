import { DefaultLayout, HeaderOnly } from '~/layouts'

import Home from '~/pages/Home'
import TopViews from '~/pages/TopViews'
import Watch from '~/pages/Watch'
import StudioVideos from '~/pages/StudioVideos'
import StudioLayout from '~/layouts/StudioLayout'
import StudioPending from '~/pages/StudioPending'
import Channel from '~/pages/Channel'
import Results from '~/pages/Results'
import Watched from '~/pages/Watched'
import Liked from '~/pages/Liked'
import Block from '~/pages/Block'
import HomeLayout from '~/layouts/HomeLayout'

export const publicRoutes = [
  { path: '/', conponemt: Home, layout: HomeLayout },
  { path: '/topviews', conponemt: TopViews },
  { path: '/watch', conponemt: Watch, layout: HeaderOnly },
  { path: '/channel/:id', conponemt: Channel },
  { path: '/results', conponemt: Results },
  { path: '/block', conponemt: Block, layout: null },
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
    path: '/feed/history',
    conponemt: Watched,
    layout: DefaultLayout,
  },
  {
    path: '/liked',
    conponemt: Liked,
    layout: DefaultLayout,
  },
]
