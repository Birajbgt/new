var cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute',new Date());
// });
const task = () => {
    console.log('running a task every second');

}
cron.schedule('* * * * * *', task);