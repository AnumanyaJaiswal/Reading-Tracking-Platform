const { get } = require('../routes/statsroute');
const { getStats } = require('../services/statsservice');

const getStatsController = async(req, res) =>{
    try {
        const userId = req.user.id;

        const stats = await getStats(userId);

        return res.status(200).json({
            success: true,
            stats,
        })
    } catch (error) {
        
         return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

module.exports = {
    getStatsController
}