const cron = require("node-cron");
const userModel = require("../models/user");

const startCronJobs = () => {
    cron.schedule('*/30 * * * *', async() => {
        try {
            const expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() - 30);
    
            const result = await userModel.deleteMany({
                isVerified: false,
                createdAt: { $lte: expiryDate },
            });
    
            console.log("DELETED successfully");
    
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = startCronJobs;