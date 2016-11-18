var express = require('express'),
    bodyParser = require('body-parser'),
    exec = require('exec'),
    path = require('path'),
    app = express(),
    server;

require('dotenv').load({
    path: path.join(__dirname, '.env'),
    silent: true
});

if (process.env.PROCESS_ROOT) {
    process.chdir(process.env.PROCESS_ROOT);
}

var updateDevProject = function() {
    // run 'git pull'; 'npm run postinstall' and 'forever restart nestblox-dev'
    exec('bash update.sh', (err, out, code) => {
        if (code) {
            return console.error('Update failed: ', err);
        }
        console.log('Updated dev site successfully');
    });
};

app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.send('yep, it works!');
});

app.post('/', function(req, res) {
    var branch = req.body.ref.replace('refs/heads/','');
    console.log(`detected push to ${branch}!`);
    if (branch === 'master') {
        console.log(new Date() + ': updating dev project');
        updateDevProject();
    }
    res.sendStatus(200);
});

server = app.listen(9000, function(err) {
    if (err) {
        throw err;
    }
    console.log('listening!');
});
