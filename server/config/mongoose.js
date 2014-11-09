var mongoose = require('mongoose');
 crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('MeanApp1 db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'Sanyi');
            User.create({firstName:'Sanyi',lastName:'Tokodi', userName:'Toki', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = createSalt();
            hash = hashPwd(salt, 'Anikó');
            User.create({firstName:'Anikó',lastName:'Tokodi', userName:'Saci', salt: salt, hashed_pwd: hash, roles: []});
            salt = createSalt();
            hash = hashPwd(salt, 'Anna');
            User.create({firstName:'Anna',lastName:'Tokodi', userName:'Anna', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'Gergő');
           User.create({firstName:'Gergő',lastName:'Tokodi', userName:'Gergő', salt: salt, hashed_pwd: hash});
        }

    })


}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}