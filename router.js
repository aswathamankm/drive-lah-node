const fileSystem = require('fs');
module.exports = function(app){

fileSystem.readFile("./app/config/router_config.json","utf8",function(routeError,routeconfigdata){
    require("./app/router/router.js")(app);
});
}
