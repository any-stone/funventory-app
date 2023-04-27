import { User } from '../models/user.js'

function index(req, res) {
  User.find({}).populate('profile')
    .then(users => {
      res.render('profiles/index', { users, title: 'User Profiles' })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("An error occurred while fetching the user profiles.")
    })
}

export { index }
