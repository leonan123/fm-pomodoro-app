// eslint-disable-next-line camelcase
import { Kumbh_Sans, Roboto_Slab, Space_Mono } from 'next/font/google'

export const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-kumbh-sans',
})

export const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-roboto-slab',
})

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const THEME_COLORS = {
  'red-variant': '0, 91%, 71%',
  'blue-variant': '182 91% 71%',
  'purple-variant': '284 89% 74%',
}

export const THEME_FONTS = {
  kumbhSans: kumbhSans.variable,
  robotoSlab: robotoSlab.variable,
  spaceMono: spaceMono.variable,
}
