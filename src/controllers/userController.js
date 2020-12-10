const User = require('../models/userModel')

function handleError(error) {

    let err = { username: '', email: '', password: ''}

    if (error.message === 'incorrect username') {
        err.username = 'that username does not exist'
    }

    if (error.message === 'incorrect email') {
        err.email = 'that email is not valid'
    }

    if (error.message === 'incorrect password') {
        err.message = 'that password is incorrect'
    }

    if (error.code === 11000) {
        err.message = 'that email is registered already'
    }    

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const userCtrl = {}


// Create a new user
userCtrl.createUser = async(req, res) => {
    try {
        let newUser = new User(req.body)
        let result = await newUser.save()
        res.status(200).send({message: 'Account created', result})
    } catch {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// Read a user detail
userCtrl.getUserDetails = async(req, res) => {
    try{
        let person = await User.findOne({username: req.body.username})
        if (!person) {
            res.status(400).send({message: 'Username not found'})
        } else {
            res.status(200).send({messsage: 'User logged in'})
        }
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// Update user details 
userCtrl.updateUserDetails = async(req, res) => {
    try {
        await User.findOneAndUpdate({_id: req.params.id}, async(user, error) => {
            if (error) {
                res.status(500).send({message: 'Internal Server Error'})
            }
            user.firstname = req.body.firstname
            user.middlename = req.body.middlename
            user.lastname = req.body.lastname
            user.username = req.body.username
            user.email = req.body.email
            user.password = req.body.password
            await user.save()
            res.status(200).send({message: 'User updated', user})
        })
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

// Delete a user account
userCtrl.deleteUser = async(req, res) => {
    try {
        let person = await User.findOneAndDelete({_id: req.params.id})
        res.status(200).send({message: 'Account deleted'})
    } catch {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

module.exports = userCtrl