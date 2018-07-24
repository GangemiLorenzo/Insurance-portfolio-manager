'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  INFO: {
    APP_NAME:'"IPM Development"',
    DEV_NAME:'"Lorenzo Gangemi"',
    FULL_APP_NAME:'"Insurance Portfolio Manager"'
  },
  FB: {
    API_KEY:'"AIzaSyDnPApRwLLxSXFC_nqGK9swGXmtp5VvZKg"',
    PROJECT_ID:'"insurance-portfolio-manager"',
    DATABASE_NAME:'"insurance-portfolio-manager"',
    BUCKET:'"insurance-portfolio-manager"'
  },
  DONATE_LINK: '"https://www.paypal.me/LorenzoGangemi"'
})
