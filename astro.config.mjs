// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://miduwu.github.io/midb',
    integrations: [
        starlight({
            title: 'midb',
            favicon: './public/icon_white.png',
            logo: {
                src: './public/icon_white.png'
            },
            social: {
				discord: 'https://discord.com/invite/dKhuDRW8dB',
				github: 'https://github.com/Miduwu/midb',
			},
            sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting Started', slug: 'guides/getting-started' },
					],
				},
			],
        })
    ]
});
