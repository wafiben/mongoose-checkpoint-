const mongoose = require("mongoose");
let personModel = require("./models/person.js");
let person = new personModel({
  name: "wafi",
  age: 29,
  favoriteFoods: ["pizza", "humburger"]
});
mongoose
  .connect("mongodb+srv://wafi:54900777@cluster0.qxhos.mongodb.net/test", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("not connected");
  });
 person.save(function (error, data) {
  if (error) {
    console.log(error);
  }
  console.log(data);
});

let arrayOfPeaple = [
  { name: "John", age: 28, favoriteFoods: ["tacos"] },
  { name: "Amin", age: 20, favoriteFoods: ["burger", "sandwish"] },
  { name: "Asma", age: 32, favoriteFoods: ["panini", "nuggets"] }
];

personModel
  .create(arrayOfPeaple)
  .then(() => {
    console.log("instance of objectes done and saved on the database");
  })
  .catch((error) => {
    console.log(error);
  }); 
  
personModel
  .find({})
  .then((data) => {
      if(data){
        console.log(data);
      }
    console.log('no data waiting')
  })
  .catch((error) => {
    console.log(error);
  });
  
 personModel
  .findOne({ favoriteFoods: "panini" })
  .then((data) => {
      if (data){
        console.log(data);
      }
      else {
          console.log('no one love this food')
      }
    
  })
  .catch((error) => {
    console.log(error);
  });
  
personModel
  .findById("6124519c14411d235c62389d")
  .then((data) => {
      if(data){
        console.log(data);
      }
    else{
        console.log('there is no person that have this favourites food')
    }
  })
  .catch((error) => {
    console.log(error);
  });
 
personModel.findById("6124519c14411d235c62389d").then((data) => {
    if(data){
        data.favoriteFoods.push("humbrger");
        data.save().then(()=>{
            console.log('stored on the database ')
        }).catch((error)=>{
            console.log(error)
        });
    }
    else {
        console.log('no person exist with this id')
    }
  
  
});
 
personModel
  .findOneAndUpdate(
    { name: "wafi" },
    { age: 20 },
    {
      new: true,
      upsert: true,
    }
  )
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
  
personModel.findByIdAndRemove({ _id:'6124519c14411d235c62389d' });
personModel
  .remove({ name: "Mary" })
  .then((data) => {
      if(data){
          console.log('done')
      }
    console.log("no data with this name");
  })
  .catch((error) => {
    console.log(error);
  });
  personModel.find({favoriteFoods : "burritos" })
  .select({age:0})
  .limit(2)
  .sort({name: 1})    //      .sort({name: 'asc'})
  .exec((err,person)=>{
    console.log("chain search query..")
      if(err){
        console.log(err)
      }
      else {
          console.log(person)
      };
  })