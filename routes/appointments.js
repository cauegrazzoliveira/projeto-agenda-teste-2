// ===== routes/appointments.js =====
const express = require('express');
const Appointment = require('../models/Appointment');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();

router.post('/', authenticate, authorize(['user']), async (req, res) => {
  const { dateTime } = req.body;
  try {
    const appointment = await Appointment.create({ userId: req.user.id, dateTime });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao agendar' });
  }
});

router.get('/', authenticate, authorize(['attendant', 'admin']), async (req, res) => {
  const appointments = await Appointment.findAll({ include: 'user' });
  res.json(appointments);
});

router.delete('/:id', authenticate, authorize(['user', 'admin']), async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);
  if (!appointment || (appointment.userId !== req.user.id && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  appointment.status = 'cancelled';
  await appointment.save();
  res.json({ message: 'Consulta cancelada' });
});

module.exports = router;