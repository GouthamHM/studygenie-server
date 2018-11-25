const AuthorizationController = require('./controllers/authentication'),
      ProfileController = require('./controllers/profile'),
      requestController = require('./controllers/requests'),
      loginController = require('./controllers/login'),
      logController = require('./controllers/logs'),
      tagController = require('./controllers/tags'),
      viewController = require('./controllers/views'),
    votesController = require('./controllers/votes'),
    notesController = require('./controllers/notes'),
    classController = require('./controllers/class'),
      express = require('express'),
      paassportService = require('./config/passport'),
      passport = require('passport');

const  requirejwtAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});

module.exports = function(app){
  const apiRoutes = express.Router(),
        userRoutes = express.Router();
        authRoutes = express.Router();
        requestRoutes = express.Router();
        loginRoutes = express.Router();
        logRoutes = express.Router();
        tagRoutes = express.Router();
        viewRoutes = express.Router();
        voteRoutes = express.Router();
        noteRoutes = express.Router();
        classRoutes = express.Router();
  apiRoutes.use('/auth',authRoutes);

  authRoutes.post('/register',AuthorizationController.register);
  authRoutes.post('/login',requireLogin,AuthorizationController.login);
  userRoutes.get('/:userId', requirejwtAuth, ProfileController.viewProfile);
  requestRoutes.post('/',requirejwtAuth,requestController.addRequest);
  loginRoutes.get('/',requirejwtAuth,loginController.getLogins);
  logRoutes.get('/',requirejwtAuth,logController.getLogs);
  logRoutes.post('/',requirejwtAuth,logController.addLog);
  tagRoutes.post('/',requirejwtAuth,tagController.addTag);
  tagRoutes.get('/',requirejwtAuth,tagController.getTags);
  viewRoutes.get('/',requirejwtAuth,viewController.getViews);
  voteRoutes.post('/',requirejwtAuth,votesController.addVote);
  voteRoutes.get('/',requirejwtAuth,votesController.getUpVotes);

  noteRoutes.get('/',requirejwtAuth,notesController.getNotes);
  noteRoutes.get('/:id',requirejwtAuth,notesController.getNotesById);
  noteRoutes.get('/class/:id',requirejwtAuth,notesController.getClassNotes);
  noteRoutes.post('/',requirejwtAuth,notesController.addNote);
  noteRoutes.put('/:id',requirejwtAuth,notesController.editNote);
  noteRoutes.delete('/:id',requirejwtAuth,notesController.deleteNote);
  
  classRoutes.get('/',requirejwtAuth,classController.getClass);
  classRoutes.post('/',requirejwtAuth,classController.addClass);
  classRoutes.delete('/:id',requirejwtAuth,classController.deleteClass);
  
  apiRoutes.use('/user', userRoutes);
  apiRoutes.use('/request',requestRoutes);
  apiRoutes.use('/logins',loginRoutes);
  apiRoutes.use('/logs',logRoutes);
  apiRoutes.use('/tags',tagRoutes);
  apiRoutes.use('/views',viewRoutes);
    apiRoutes.use('/votes',voteRoutes);
    apiRoutes.use('/notes',noteRoutes);
    apiRoutes.use('/class',classRoutes);
  app.use('/api',apiRoutes);
};
