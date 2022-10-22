const dotenv = require('dotenv');
const mongoose = require("mongoose")
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
// mongodb+srv://<username>:<password>@cluster0.bqxyorv.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(DB,{
  useCreateIndex : true ,
  useNewUrlParser : true,
  useFindAndModify :false
}).then(con=>{
  console.log("DB Connection is established");
});


// Creation of the Schema , model and documents from the database ->

const tourSchema =  new mongoose.Schema({
name:{
  type:String,
  required : [true,'A tour must have a name'],
  unique : true,
},
rating:{
  type:Number,
  required:[true,"A tour must have a rating "],
  default: 4.7,
},
price : {
  type : Number,
  required : [true,' A tour must have a price'],
  default : 4,
}
})

// creation of the model -
const Tour = mongoose.model('Tour',tourSchema);

//  creation of the documents - 
const testTour = new Tour({
name: " the forest Hiker ",
rating : 4.7,
price : 450 ,
})

testTour.save().then(doc=>{
  console.log(doc);
}).catch(
  err=>{
console.log("Error 😵‍💫 ",err)
  }
);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
