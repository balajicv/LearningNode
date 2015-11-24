var mongoose = require("mongoose");
var url = "mongodb://localhost/users";

// Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(url, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + url + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + url);
      }
    });

    var userSchema = new mongoose.Schema({
      name: {
        first: String,
        last: { type: String, trim: true }
      },
      age: { type: Number, min: 0 }
    });


    var PUser = mongoose.model('PowerUsers', userSchema);   
    // Creating one user.
    var johndoe = new PUser ({
      name: { first: 'John', last: '  Doe   ' },
      age: 25
    });

    // Saving it to the database.
    johndoe.save(function (err) {if (err) console.log ('Error on save!')});