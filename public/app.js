const toCurrency  = price =>{
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'rub'
  }).format(price)
}

const toDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $cart = document.querySelector('.cart')
if($cart) {
  $cart.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      const csrf = event.target.dataset.csrf
      fetch('/cart/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        }
      }).then(res => res.json())
        .then(cart => {
          if(cart.courses.length) {
            const html = cart.courses.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td><button class="btn js-remove" data-id="${c.id}" data-csrf="${csrf}">Удалить</button></td>
              </tr>
              `
            }).join(' ')
            document.querySelector('tbody').innerHTML = html
            document.querySelector('.price').innerText = toCurrency(cart.price)
          } else {
            $cart.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent)
})

M.Tabs.init(document.querySelectorAll('.tabs'))