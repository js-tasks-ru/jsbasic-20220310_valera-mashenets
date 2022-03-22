function showSalary(users, age) {
  let resString = '';
  let usersFilter = users.filter((item) => {
    if(item.age <= age) {
      return true;
    }
  });
  for(let i = 0; i < usersFilter.length; i++) {
    if(i < usersFilter.length - 1) {
      resString += `${usersFilter[i].name}, ${usersFilter[i].balance}\n`;
    } else {
      resString += `${usersFilter[i].name}, ${usersFilter[i].balance}`;
    }  
  }
  return resString;
}
