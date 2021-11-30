const express = require('express')

const { auth: ctrl } = require('../../controllers')
const { validation, controllerWrapper, authenticate, upload } = require('../../middlewares')
const { joiSchema } = require('../../models/user')

const router = express.Router()

router.post('/register', validation(joiSchema), controllerWrapper(ctrl.register))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/avatars', authenticate, upload.single('avatarURL'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify', controllerWrapper(ctrl.repeatVerification))

module.exports = router
