const { Router } = require('express')
const router = Router()

const {
    createUser,
    getUserDetails,
    updateUserDetails,
    deleteUser
} = require('../controllers/userController')

// To create an account...
router.post('/api/user/new', createUser)

// To get account details...
router.get('/api/user/username', getUserDetails)

// To update account details...
router.put('/api/user/update', updateUserDetails)

// To delete an account...
router.delete('/api/user/delete', deleteUser)

module.exports = router

