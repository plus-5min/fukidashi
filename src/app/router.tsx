import { createBrowserRouter } from 'react-router'

import { GeneratorPage } from '../pages/GeneratorPage'
import { GuidePage } from '../pages/GuidePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TermsPage } from '../pages/TermsPage'
import { AppLayout, GeneratorLayout } from './AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: GeneratorLayout,
    children: [{ index: true, Component: GeneratorPage }],
  },
  {
    Component: AppLayout,
    children: [
      { path: 'guide', Component: GuidePage },
      { path: 'terms', Component: TermsPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
