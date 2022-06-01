const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
 
// module.exports = {
//     context: path.join(__dirname, 'your-app'),
    
// };

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        })
    ]
});