module.exports = {
  plugins: {
    'postcss-mixins': {
      mixinsDir: './styles/mixins/'
    },
    'postcss-preset-env': {
      importFrom: ['./styles/media-queries/media-queries.css'],

      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    }
  }
}