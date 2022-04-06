export default class UserTable {
  constructor(rows) {
    this.elem = this.createElement(rows);
  }

  createElement(rows) {
    let tableDom = document.createElement('table');
    let tbodyDom = document.createElement('tbody');

    tableDom.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    `;
    for(let i = 0; i < rows.length; i++) {
      let tr = document.createElement('tr');
      let lastTd = document.createElement('td');
      let btn = document.createElement('button');
      btn.innerHTML = 'X';
      lastTd.appendChild(btn);

      btn.addEventListener('click', function() {
        this.closest('tr').remove();
      })

      for (let item in rows[i]) {
        let td = document.createElement('td');
        td.innerHTML = rows[i][item];
        tr.appendChild(td);
      }
      tr.appendChild(lastTd);
      tbodyDom.append(tr);
    }
    
    tableDom.appendChild(tbodyDom);
    return tableDom;
  } 
}

