const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://noy-green:19921989@cluster0.vln8b.mongodb.net/store?retryWrites=true&w=majority', 
{useNewUrlParser: true,useUnifiedTopology:true});

const db = mongoose.connection

db.on('error', (err) => console.log(err))
db.once('open', () => {
	// we're connected!
	console.log('connected to mongo on localhost')
})