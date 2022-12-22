import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'HighScore',
  description: 'Open Source leaderboard.',
  base: '/HighScore',
	themeConfig: {
    logo: '/logo.png',

		socialLinks: [
      { icon: 'github', link: 'https://github.com/EmilienLeroy/HighScore' }
    ],

    nav: [
      { text: 'Guide', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsible: true,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Customization', link: '/guide/customization' }
          ]
        },
        {
          text: 'Usage',
          collapsible: true,
          items: [
            { text: 'Scores', link: '/guide/scores' },
            { text: 'Categories', link: '/guide/categories' },
            { text: 'Download', link: '/guide/download' }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Emilien Leroy'
    },
	}
});