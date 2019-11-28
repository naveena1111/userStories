import { Router } from 'express';
const teacherCntrl = require('./../controllers/teacher');
export const teachers = Router();

teachers.post('/register', teacherCntrl.register);
teachers.get('/commonstudents', teacherCntrl.commonstudents);
teachers.post('/suspend',teacherCntrl.suspend);
teachers.post('/retrivefornotification',teacherCntrl.retrivefornotification)


