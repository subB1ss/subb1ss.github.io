import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://subb1ss.github.io/',
  lang: 'zh-CN',
  title: '我的文档',
  subtitle: 'Record of my life',
  author: {
    name: '阿套',
    avatar: '/avatar.jpeg',
    status: {
      emoji: '🍀',
      message: 'Wish you a good luck~'
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
      name: 'Telegram',
      link: 'https://t.me/ra1nma1n',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
  ],
  search: {
    enable: true,
  },
  lastUpdated: true,
  license: {
    enabled: false,
    language: 'en',
  },
  frontmatter: {
    sponsor: false,
    copyright: false,
  },
})
