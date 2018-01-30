//storing our sensitive keys on in a seperate file that won't be uploaded to github, and then exporting them.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
