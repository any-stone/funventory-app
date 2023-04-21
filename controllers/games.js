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

export {
  index
}