import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){

Images = new Mongo.Collection("images");
if (Images.find().count()==0) {
  for (var i = 1  ; i <= 6; i++){
      Images.insert({
                      img_src:"img_"+i+".jpg",
                      img_alt:"image number."+i
      });
   }}
//  }else {
//   for (var i = 1  ; i <= 6; i++){
//       Images.insert({
//                       img_src:"img_"+i+".jpg",
//                       img_alt:"image number."+i
//       }
//       );
//    }
// }

console.log(Images.find().count());
});
  // code to run on server at startup
