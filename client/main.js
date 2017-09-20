import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Images = new Mongo.Collection("images");
//console.log(Images.find().count());
// var img = [
// {
//     img_src:"1.jpg",
//     img_alt:"applemacbook"
// },
// {
//     img_src:"4.jpg",
//     img_alt:"coding"
// },
// {
//     img_src:"3.jpg",
//     img_alt:"calculating"
// },
// ];
Accounts.ui.config({
  passwordSignupFields:"USERNAME_AND_EMAIL"
});
Template.moron.helpers({img:function() {
    // return Images.find({},{sort:{rating:-1}});

    if (Session.get("userfilter")) {
      return Images.find({createdBy: "Marawan salah"},{sort:{rating:-1}});
    }
    else {
      return Images.find({},{sort:{rating:-1}});
    }
    //return Images.find({},{sort:{rating:-1}});
  }     //img:Images.find({},{sort:{rating:-1}})
});

Template.body.helpers({username:function () {
  if (Meteor.user()) {
    return Meteor.user().username;
  }else{
    return "anonymous user";
  }
}
});

Template.moron.events({
  'click .js-image':function(event) {
    console.log(event);
  },
  'click .js-delete':function(event) {
    var image_id = this._id;
    $("#"+image_id).hide("slow",function() {
      Images.remove({"_id":image_id});
    })
  },
  'click #js-rate-im':function (event) {
    var rating = $(event.currentTarget).data("userrating");
    console.log(rating);
    var image_id = this.class;
    console.log(image_id);
    Images.update({_id:image_id},{$set:{rating:rating}});
  },
  'click .js_show_image_form':function(event) {
    $("#image_add_modal").modal('show');
  },
  'click .js-user-filter':function (event) {
    console.log(this.createdBy);
    Session.set("userfilter",this.createdBy);
  }
});
Template.image_add.events({
  'submit .js-image-add':function(event) {
    var img_src = event.target.img_src.value;
    var img_alt = event.target.img_alt.value;
    if(Meteor.user()){
      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdBy:Meteor.user().username
      });
    }

    console.log(img_src);
    return false;
  }
});
