const express = require('express'),
    bodyParser = require('body-parser'),
    exec = require('exec'),
    path = require('path'),
    app = express();

require('dotenv').load({
    path: path.join(__dirname, '.env'),
    silent: true
});

if (process.env.PROCESS_ROOT) {
    process.chdir(process.env.PROCESS_ROOT);
}

const updateDevProject = function() {
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
    const githubEvent = req.headers['x-github-event'];
    if(githubEvent === 'ping') {
        console.log(new Date() + ': Received ping');
        res.status(200).send(`Hi ${req.body.sender?.login}, pinging back.`, 200);
    }
    else if(githubEvent === 'push') {
        const branch = req.body.ref.replace('refs/heads/','');
        console.log(`detected push to ${branch}!`);
        if (['master', 'main'].includes(branch)) {
            console.log(new Date() + ': updating dev project');
            updateDevProject();
        }
        res.sendStatus(200);
    } else {
        console.log(`received ${githubEvent}, which is not supported!`);
        res.status(400).send('Only push and ping events are supported!');
    }

});

const server = app.listen(9000, function(err) {
    if (err) {
        throw err;
    }
    console.log('listening!');
});
