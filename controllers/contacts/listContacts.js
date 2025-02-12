const { BadRequest } = require('http-errors')
const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { page, limit } = req.query
  if (isNaN(page) || isNaN(limit)) {
    throw new BadRequest('Page and limit shoud be number')
  }
  const { _id } = req.user
  const skip = (page - 1) * limit
  const result = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
    { skip, limit: +limit })
    .populate('owner', '_id email')
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = listContacts
