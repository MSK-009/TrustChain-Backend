const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const logToSupabase = async (uid, stage, status) => {
  const { data, error } = await supabase.from('stage_events').insert([
    { uid, stage, status, timestamp: new Date().toISOString() }
  ]);
  if (error) throw error;
  return data;
};

module.exports = { logToSupabase };
