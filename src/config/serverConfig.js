if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    port : process.env.PORT || 3000,
    host : process.env.HOST || 'localhost',
    sessionSecret : process.env.SESSION_SECRET,
    hostname : function() {
        return this.host + ':' + this.port;
    },
    domain : function() {
        return 'http://'+this.hostname();
    }
}