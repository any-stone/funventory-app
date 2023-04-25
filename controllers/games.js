import { Game } from '../models/game.js'

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      games,
      title: '🕹️'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function show(req, res) {
  Game.findById(req.params.gameId)
    .populate("owner")
    .populate("reviews")
    .populate("reviews.owner")
    .then(game => {
      res.render('games/show', {
        game,
        title: 'Game show'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/games')
    })
}


function edit(req, res) {
  Game.findById(req.params.gameId)
  .populate('reviews')
  .then(game => {
    res.render("games/edit", {
      game,
      title: 'Edit Game'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Game.findByIdAndUpdate(req.params.gameId, req.body, { new: true })
    .then(game => {
      console.log("Updated game:", game)
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    });
}


function deleteGame(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      return Game.findByIdAndDelete(req.params.gameId)
    }
  })
  .then(game => {
    if (game) {
      res.redirect('/games')
    }
  })
  .catch(err => {
    console.log(err);
    res.redirect('/')
  })
}


export {
  index,
  create,
  show,
  edit,
  update,
  deleteGame as delete,
}