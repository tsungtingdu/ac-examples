const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
require('./config/mongoose');

const app = express();
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./public/javascripts/handlebarHelpers')
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// 將 request 導入路由器
app.use(routes);

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});