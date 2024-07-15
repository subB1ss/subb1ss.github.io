import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://valaxy.site/',
  lang: 'zh-CN',
  title: '我的文档',
  subtitle: 'Record of my life',
  author: {
    name: '阿套',
    avatar: '/avatar.jpeg',
    status: {
      emoji: '🍀',
      message: 'wish you a good luck~'
    }
  },
  description: '用来放一些生活中工作中的随笔.',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/subB1ss',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/ra1nma1n',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
  ],

  search: {
    enable: true,
  }
})
