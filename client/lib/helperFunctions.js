goToNextRouteAfterLoggedIn = function(userId) {
  Meteor.call('getUserType', userId, function(err, res) {
    if (res === 'TASKER') {
      FlowRouter.go('taskerHome', {}, {initTab: 0});
    } else {
      FlowRouter.go('askerHome', {}, {initTab: 0});
    }
  });
  // const userRole = getUserRole();
  // if (userRole === 'TASKER') {
  //   FlowRouter.go('taskerHome', {}, {initTab: 0});
  // } else {
  //   FlowRouter.go('askerHome', {}, {initTab: 0});
  // }
};

getDataFromLocalStorage = function(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

setDataToLocalStorage = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

clearLocalStorage = function(key) {
  localStorage.removeItem(key);
};

clearAllLocalStorage = function() {
  localStorage.clear();
};

getLocalization = function() {
  return getDataFromLocalStorage('localization');
};

splitDateTime = function(srcDate, srcTime) {
  moment.locale('vi');
  return {
    date: moment(srcDate).format('DD/MM/YYYY'),
    time: moment(srcTime).format('h:mm A'),
    datetime: moment(srcTime).format('h:mm A') + ' ' + moment(srcDate).format('DD/MM/YYYY'),
  };
};

replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};

onFormatDate = function(date) {
  return moment(date).format('DD/MM/YYYY');
};

onFormatTime = function(date) {
  return moment(date).format('h:mm');
};

validPhoneNumber = function(phoneNumber) {
  const phoneRegex = /^[0][1|9]\d{8,9}$/;
  return phoneRegex.test(phoneNumber);
};

validateEmail = function(email) {
  const emailRegEx = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
  return emailRegEx.test(email);
};

logger = function(message, data) {
  if (IS_DEBUG === true) {
    Meteor.call('winstonLog', message, data);
  }
};

validatePasswordLength = function(password) {
  const passRegex = /^\S{6,12}$/;
  return passRegex.test(password);
};

formatMoney = function(number) {
  return accounting.formatNumber(number);
};
