var   express = require('express')
    , app = express()
    , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task_manager');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var taskSchema = mongoose.Schema({
    description: String,
    complete: Boolean
})

var Task = mongoose.model('Task', taskSchema);

app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  Task.find(function (err, tasks) {
    if (err) return console.error(err);
    res.render('tasks/index', { tasks: tasks });
  })
});

app.get('/tasks/new', function(req, res){
  res.render('tasks/new');
});

app.post('/tasks', function(req, res){
  new Task(req.body).save();
  res.redirect('/');
});

app.put('/tasks/:id', function(req, res){
  var id = req.params.id;

  Task.findByIdAndUpdate(id, { $set: req.body}, function (err, task) {
    if (err) return handleError(err);
    res.send(task);
  });
})

app.del('/tasks/:id', function(req, res){
  var id = req.params.id;

  Task.remove({_id: id}, function(err){
    if (err) return handleError(err);
    console.log('Task removed')
  });

  res.redirect('/');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});