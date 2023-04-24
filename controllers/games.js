import { Game } from '../models/game.js'

function index(req, res) {
  console.log('GAMES 🕹️')
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
  .then(game => {
    res.render('games/show', {
      game,
      title: "Game show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

export {
  index,
  create,
  show,
}