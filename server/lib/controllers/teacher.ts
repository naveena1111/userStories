import Teacher from '../models/teacher';
import Student from '../models/student';
var _ = require('lodash');
var Utils = require('./../utils');

const TeacherController = () => {

    //teacher and student registration create
    const register = async (req, res, next) => {
        let userInput = req.body;
        try {
            if (!userInput.teacher) {
                res.status(400).json({ status: "error", msg: 'Teacher mailId is required' });
            }
            let teacherObj = { 'email': userInput.teacher };
            req.body.students = _.map(userInput.students, function (o) {
                let obj = {};
                obj['email'] = o;
                return obj;
            });

            teacherObj['students'] = userInput.students
            const teacher = await Teacher.create(teacherObj, { include: [{ model: Student }] });
            if (teacher) {
                res.status(204).json(teacher);
            }
        } catch (err) {
            var errorMessage = Utils.constructErrorMessage(err);
            return res
                .status(500)
                .json({ status: "error", msg: errorMessage });
        }
    };
    //get student email id of teachers
    const commonstudents = async (req, res, next) => {
        let userInput = req.query;
        let condition = {};
        try {
            if (!userInput.teacher) {
                res.status(400).json({ status: "error", msg: 'Teacher mailId is required' });
            }

            if (userInput.teacher) {
                condition['email'] = userInput.teacher;
            }


            let response = await Teacher.findAll({
                where: condition,
                attributes: ['id', 'email'],
                include: [{
                    model: Student,
                    attributes: ['id', 'email']
                }]
            });

            const studentarray: string[] = [];
            _.map(response, function (o) {

                _.map(o.students, function (value) {
                    studentarray.push(value.email);
                })

            });
            let teacherObj = {};
            teacherObj['students'] = studentarray;
            res.json(teacherObj);
        } catch (err) {
            var errorMessage = Utils.constructErrorMessage(err);
            return res
                .status(500)
                .json({ status: "error", msg: errorMessage });
        }
    };
    //suspend a specific student by his email id
    const suspend = async (req, res, next) => {
        let userInput = req.body;
        try {
            if (!userInput.student) {
                res.status(400).json({ status: "error", msg: 'student mailId is required' });
            }
            if (userInput.student) {
                let studentResp = await Student.findOne({ where: { email: userInput.student } });
                if (studentResp) {
                    let obj = { status: 'suspend' }
                    await Student.update(obj, { where: { email: userInput.student } });
                } else {
                    res.status(400).json({ status: "error", msg: 'student mailId is not found' });
                }
            }
        } catch (err) {
            var errorMessage = Utils.constructErrorMessage(err);
            return res
                .status(500)
                .json({ status: "error", msg: errorMessage });
        }


    };
    //get recipients to send notification
    const retrivefornotification = async (req, res, next) => {
        let userInput = req.body;
        let condition = {};
        condition['status'] = 'active';
        condition['notification'] = 'everyone';
        let teacherCondition = {};
        teacherCondition['email'] = userInput.teacher;
        let notification = userInput.notification;
        if (!notification) {
            res.status(400).json({ status: "error", msg: 'Notification is required' });
        }
        if (!userInput.teacher) {
            res.status(400).json({ status: "error", msg: 'TeacherMailId is required' });
        }
        let resp = notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (resp) {
            let notificationobj = { notification: 'specific' }
            await Student.update(notificationobj, { where: { email: resp } });
        }
        let retriveinfo = await Teacher.findAll({
            where: teacherCondition,
            attributes: ['id', 'email'],
            include: [{
                model: Student,
                where: condition,
                attributes: ['id', 'email']
            }]
        });
        const studentarray: string[] = [];
        _.map(retriveinfo, function (o) {

            _.map(o.students, function (value) {
                studentarray.push(value.email);
            })

        });
        let teacherObj = {};
        teacherObj['receiptients'] = studentarray;
        res.json(teacherObj);

    }

    return {
        register,
        commonstudents,
        suspend,
        retrivefornotification
    };
}
module.exports = TeacherController();