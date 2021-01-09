export default {
  dev: process.env.NODE_ENV !== 'production',
  ssr: false,
  modern: true,
  target: 'static',
  srcDir: 'src',
  modules: [
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss'
  ],
  head: {
    title: 'FFXIV コンテンツ開放ジェネレーター',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'FFXIVのコンテンツ開放風画像が作成できるジェネレーターです。' }
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      }
    ]
  }
}
