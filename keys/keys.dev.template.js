module.exports = {

  // Данные авторизации для bd 
  mongoLog:     'login mongodb',
  mongoPass:    'password mongodb',

  // Строка подключения к удаленной bd
  mongoUrl:     'mongodb+srv://<username>:<password>@cluster0.ny6ee.mongodb.net/<name bd>?retryWrites=true&w=majority',

  // Строка подключения (старой версии) к удаленной bd
  mongoUrlOld:  `mongodb://<username>:<password>@cluster0-shard-00-00.ny6ee.mongodb.net:27017,cluster0-shard-00-01.ny6ee.mongodb.net:27017,cluster0-shard-00-02.ny6ee.mongodb.net:27017/<name bd>?ssl=true&replicaSet=atlas-xsupeu-shard-0&authSource=admin&retryWrites=true&w=majority`,

  // Строка подключения к локальной bd
  mongoLoc:     `mongodb://localhost:27017/<name bd>?retryWrites=true&w=majority`,

  // Ключ для защиты сессий
  secret:       '', 

  // API key сервера рассылок писем
  sendBlueAPI:  'your API key', 

  // Адрес и имя отправителя в теле писем
  mailSender:   {'email':'api@sendinblue.com', 'name':'Sendinblue'}, 

  // Адрес ссылки в теле письма
  baseURL:      'http://localhost:3000' 
}