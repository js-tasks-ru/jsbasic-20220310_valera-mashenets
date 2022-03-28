function highlight(table) {
  let tbody = table.querySelector('tbody');
  for (let row of tbody.rows) {
    if (row.lastElementChild.getAttribute('data-available') === 'true') {
      row.classList.add('available');
    } else if (row.lastElementChild.getAttribute('data-available') === 'false') {
      row.classList.add('unavailable');
    } else if (row.lastElementChild.getAttribute('data-available') === null) {
      row.setAttribute('hidden','');
    }

    if(row.cells[2].innerHTML === 'm') {
      row.classList.add('male');
    } else if (row.cells[2].innerHTML === 'f') {
      row.classList.add('female');
    }

    if(+row.cells[1].innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}