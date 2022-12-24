const keys = require('../keys')
const private = require('../keys')

module.exports = function (email, name) {
  return {
    'subject':'Магазин курсов',
    'sender' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
    'to' : [{'name': `${name}`, 'email': `${email}`}],
    'htmlContent' : `
      <html>
        <body>
          <h1>Добро пожаловать на наш сайт</h1>
          <p>Вы успешно создали аккаунт с email - ${email}</p>
          <hr/>
          <a href="${keys.baseURL}">Магазин курсов</a>
        </body>
      </html>
    `
  }
}