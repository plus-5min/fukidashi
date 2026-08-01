import { createBrowserRouter } from 'react-router'

import { GeneratorPage } from '../pages/GeneratorPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { AppLayout } from './AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: GeneratorPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
