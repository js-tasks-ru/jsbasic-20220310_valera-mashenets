function makeFriendsList(friends) {
  let result = '';
  let ul = document.createElement('ul');
  for(let i = 0; i < friends.length; i++) {
    result += `<li>${friends[i].firstName} ${friends[i].lastName}</li>`;
  }
  ul.innerHTML = result;
  return ul;
}

