const cpuService = require('../services/cpu_service');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  cpuService.getItems().then((cpus) => {
    res.json(cpus);
  });
});

router.get('/:id', function(req, res) {
  const cpuId = req.params.id;
  cpuService.getItem(cpuId).then((cpu) => {
    if (cpu) {
      res.json(cpu);
    } else {
      res.status(404).json({ error: 'CPU not found' });
    }
  }, (error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

router.post('/', function(req, res, next) {
  const newCpu = req.body;
  cpuService.putItem('cpus', newCpu).then((result) => {
    res.status(201).json(result);
  }, (error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

module.exports = router;
