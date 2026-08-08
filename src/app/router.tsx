import { createBrowserRouter } from 'react-router'

import { GeneratorPage } from '../pages/GeneratorPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { TermsPage } from '../pages/TermsPage'
import { AppLayout } from './AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: GeneratorPage },
      { path: 'terms', Component: TermsPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
