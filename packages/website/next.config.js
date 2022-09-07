/* eslint-disable tsdoc/syntax */
import { URL, fileURLToPath } from 'node:url';
import { remarkCodeHike } from '@code-hike/mdx';
import mdxLoader from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import shikiThemeDarkPlus from 'shiki/themes/dark-plus.json' assert { type: 'json' };

const withMDX = mdxLoader({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm, [remarkCodeHike, { theme: shikiThemeDarkPlus, lineNumbers: true }]],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
	},
});

/**
 * @type {import('next').NextConfig}
 */
export default withMDX({
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	cleanDistDir: true,
	experimental: {
		outputFileTracingRoot: fileURLToPath(new URL('../../', import.meta.url)),
		fallbackNodePolyfills: false,
	},
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
