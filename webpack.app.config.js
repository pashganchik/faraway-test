const commonConfig = require("./webpack.common.config");
module.exports = () => {
    return commonConfig("app");
};
