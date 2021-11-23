const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))
module.exports = router
