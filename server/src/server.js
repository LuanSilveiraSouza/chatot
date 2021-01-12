const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/', (req, res) => {
	return res.status(200).json({ msg: 'Hello World!' });
});

app.listen(3030, () => console.log('Server running at port 3030'));
