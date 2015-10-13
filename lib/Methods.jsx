Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      private: false,
      username: Meteor.user().username
    });
  },

  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off

      alert("Permission Denied!");
    }
    else {
      Tasks.remove(taskId);
      alert("Remove Successfull!");
    }

    //throw new Meteor.Error("not-authorized");


  },

  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off

      alert("Permission Denied!");
    }

    else {
      Tasks.update(taskId, { $set: { checked: setChecked} });
      alert("Successfull!");
    }
    //return false;
    //throw new Meteor.Error("not-authorized");
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      alert("Permission Denied!");
    }
    else {
      Tasks.update(taskId, { $set: { private: setToPrivate } });
      alert("Successfull!");
    }

    //throw new Meteor.Error("not-authorized");


  }
});
