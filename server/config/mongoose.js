var mongoose = require('mongoose');

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
        userName: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName:'Sanyi',lastName:'Tokodi', userName:'Toki'});
            User.create({firstName:'Anikó',lastName:'Tokodi', userName:'Saci'});
            User.create({firstName:'Anna',lastName:'Tokodi', userName:'Anna'});
            User.create({firstName:'Gergő',lastName:'Tokodi', userName:'Gergő'});
        }

    })


}