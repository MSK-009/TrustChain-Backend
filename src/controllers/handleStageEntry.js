const { logToSupabase, updateItemLocation, logToOrderItems, getAllStageEvents } = require('../services/supabaseService');
const { logToBlockchain } = require('../services/blockchainService');

const handleStage = async (req, res) => {
  try {
    const { uid, stage, action, order_id } = req.body;
    const status = action === 'entry' ? 'Present' : 'Left';

    const itemLocationResult = await updateItemLocation(uid, stage, action);
    // const blockchainTx = await logToBlockchain(uid, stage, status);
    // const dbResult = await logToSupabase(uid, stage, status, blockchainTx);
    const dbResult = await logToSupabase(uid, stage, status, 'abc');

    if(order_id != ''){
      const orderItemsResult = await logToOrderItems(order_id, uid, stage);
      // res.json({ success: true, dbResult, blockchainTx, itemLocationResult, orderItemsResult  });
      return res.json({ success: true });
      
    }

    // res.json({ success: true, dbResult, blockchainTx, itemLocationResult  });
     return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging event');
  }
};


const getStageEvents = async(req, res) =>{
  try {
    const events = await getAllStageEvents();
    return res.status(200).json({
      success: true,
      events
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }


}
module.exports = { handleStage, getStageEvents };
