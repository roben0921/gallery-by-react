'use strict';
// Settings configured here will be merged into the final config object.
postcss: function () {
  return [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie >= 8']
    })
  ];
}
export default {
}
