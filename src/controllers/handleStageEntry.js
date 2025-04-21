const { logToSupabase } = require('../services/supabaseService');
const { logToBlockchain } = require('../services/blockchainService');

const handleStage = async (req, res) => {
  try {
    const { uid, stage, action } = req.body;
    const status = action === 'entry' ? 'Present' : 'Not-Present';

    const dbResult = await logToSupabase(uid, stage, status);
    const blockchainTx = await logToBlockchain(uid, stage, status);

    res.json({ success: true, dbResult, blockchainTx });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging event');
  }
};

module.exports = { handleStage };
