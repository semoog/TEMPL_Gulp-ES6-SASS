import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import session from 'express-session';

const app = express();
const port = 9000;

//middleware==========================
app.use(bodyParser.json());
var corsOptions = {
   origin: 'http://localhost:9000'
}
app.use(cors(corsOptions));
// app.use(session({secret: config.sessionSecret}))
app.use(express.static(__dirname + '/../../../build'));  //serve all of our static front-end files from our server.

// app.post('/api/login',userCtrl.login);
// app.get('/api/profiles', profileCtrl.getFriends);
// app.put('/movies/:id', moviesController.update);
// app.delete('/movies/:id', moviesPolicies.canDestroy, moviesController.destroy);

app.listen(port, function() {
   console.log('Listening on port ', port);
})
