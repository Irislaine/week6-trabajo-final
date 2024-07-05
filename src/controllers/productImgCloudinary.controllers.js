const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path');
const fs = require('fs');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary')

const create = catchError(async (req, res) => {
  const { path, filename } = req.file

  const { url, public_id } = await uploadToCloudinary(path, filename)

  const imageDB = await ProductImg.findOne({ where: { filename: public_id } })

  if (imageDB) return res.sendStatus(404)

  const result = await ProductImg.create({ filename: public_id, url }); // iPhone -> ecommerce/iPhone
  return res.status(201).json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await ProductImg.findByPk(id)
  if (!result) return res.sendStatus(404)
  await deleteFromCloudinary(result.filename)
  await result.destroy()
  return res.sendStatus(204);
});

module.exports = {
  create,
  remove,
}