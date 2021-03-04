const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});

router.get('/getMark', (req, res, next) => {
  api.getMark(req, res, next);
});

router.get('/deleteMark', (req, res, next) => {
  api.deleteMark(req, res, next);
});

router.post('/insertMark', (req, res, next) => {
  api.insertMark(req, res, next);
});

router.get('/getAdd', (req, res, next) => {
  api.getAdd(req, res, next);
});

router.get('/deleteAdd', (req, res, next) => {
  api.deleteAdd(req, res, next);
});

router.post('/insertAdd', (req, res, next) => {
  api.insertAdd(req, res, next);
});
module.exports = router;
