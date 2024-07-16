import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '我的文档',
      cloud: {
        enable: true,
      },
    },

    pages: [
    ],

    footer: {
      since: 2021,
      icon: {
        enable: false,
      },
    },

    say: {
      enable: false,
      api: '',
      hitokoto: {
        enable: false,
        api: '',
      },
    },
  },

  unocss: { safelist },
})
