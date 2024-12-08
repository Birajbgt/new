const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Task = require('../model/taskModel');
// const User = require('../model/userModel');

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'virajbogati11@gmai;.com', // Replace with your email
        pass: 'Cvbfghrty567@##@'   // Use environment variables for security
    }
});

// Function to send email notification
const sendEmailNotification = (task,) => {
    const mailOptions = {
        from: 'virajbogati11@gmai;.com',
        to: "virajbogati78@gamail.com",
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
cron.schedule('0 0 * * *', async () => {
    console.log('Checking for overdue tasks...');

    // Get tasks that are overdue and not completed
    const overdueTasks = await Task.find({
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' }
    }).populate('user'); // Populate the user info for sending notifications

    overdueTasks.forEach((task) => {
        const userEmail = task.user.email;
        sendEmailNotification(task, userEmail);
    });
});
