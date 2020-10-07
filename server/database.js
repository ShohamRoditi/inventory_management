const mongoose    = require('mongoose'),
    
    consts = require('./consts'),
    url = consts.MLAB_URL,
      options     = {
            useNewUrlParser:    true,
            useUnifiedTopology: true,
            user:               consts.DB_USER,
            pass:              consts.DB_PASS,
    };

mongoose.connect(url ,options).then(
        () => {
            console.log('connected')
        },
        err => {
            console.log(`connection error: ${err}`)
        }
);