  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  Meteor.subscribe("tasks");
  Meteor.subscribe("users");
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    const local = getDataFromLocalStorage('localization');
  	_i18n.setLocale(local ? local : 'vi-VN');
    React.render(<App />, document.getElementById("render-target"));
  });
//vDkmmZN3az33EMJpX
