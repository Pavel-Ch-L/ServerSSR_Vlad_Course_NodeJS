const keys = require('../keys')

module.exports = function (email, name, token) {
  return {
    'subject':'Восстановление доступа',
    'sender' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
    //'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
    'to' : [{'name': `${name}`, 'email': `${email}`}],
    'htmlContent' : `
      <html>
        <body>
          <h1>Вы забыли пароль ?</h1>
          <p>Если нет, то проигнорируйте данное письмо</p>
          <p>Иначе нажмите на ссылку ниже:</p>
          <p><a href="${keys.baseURL}/auth/password/${token}">Обновить пароль</a></p>
          <hr/>
          <a href="${keys.baseURL}">Магазин курсов</a>
        </body>
      </html>
    `
  }
}