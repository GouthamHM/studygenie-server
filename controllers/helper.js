exports.setUserInfo = function(user){
  return {
    _id : user._id,
    firstName: user.profile.firstName,
    lastName : user.profile.lastName,
    email : user.email,
    dept : user.dept,
    reqs : user.requests
  }
};
exports.setRequestInfo = function(requests){
  var returnList = [];
  for(var i=0;i<requests.length;i++){
    returnList.push({
      _id : requests[i]._id,
      will_give: requests[i].will_give,
      need : requests[i].need,
      user:{
        _id : requests[i].user._id,
        firstName: requests[i].user.profile.firstName,
        lastName : requests[i].user.profile.lastName,
        email : requests[i].user.email,
        dept : requests[i].user.dept,
      }
    })
  }
  return returnList;
};


