module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['next'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
