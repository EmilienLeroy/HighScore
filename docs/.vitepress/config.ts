import { defineConfig } from 'vitepress'

export default defineConfig({
	title: 'HighScore',
  description: 'Open Source leaderboard.',
	themeConfig: {
		socialLinks: [
      { icon: 'github', link: 'https://github.com/EmilienLeroy/HighScore' }
    ],
		footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Emilien Leroy'
    },
	}
});