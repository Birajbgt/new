const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Task = require('../model/taskModel');

// Set up nodemailer transporter with generated app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bogatibiraj35@gmail.com',
        pass: process.env.PASSWORD
    }
});

// Function to send email notification
const sendEmailNotification = (task) => {
    const mailOptions = {
        from: 'bogatibiraj35@gmail.com',
        to: "virajbogati78@gmail.com",  // Replace with dynamic email if needed
        subject: `Task "${task.title}" is overdue!`,
        text: `The task "${task.title}" was due on ${task.dueDate}. Please complete it as soon as possible.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Notification sent: ' + info.response);
        }
    });
};

// Cron job to check for overdue tasks every day at midnight
cron.schedule('* * * * * *', async () => {
    console.log('Checking for overdue tasks...');

    // Get tasks that are overdue and not completed
    const overdueTasks = await Task.find({
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' }
    });

    overdueTasks.forEach((task) => {
        const userEmail = "virajbogati11@gmail.com";  // Replace with dynamic email if needed
        sendEmailNotification(task, userEmail);
    });
});
