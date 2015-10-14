Meteor.publish("tasks", function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});
Meteor.publish("users", function () {
  return Meteor.users.find({});
});
