// Debug script to test Supabase connection
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

console.log('Environment variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function testConnection() {
  try {
    console.log('\nTesting Supabase connection...');
    
    const { data, error } = await supabase
      .from("live_stats")
      .select("total_signups")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return;
    }

    console.log('Success! Data from Supabase:', data);
    console.log('Total signups:', data?.total_signups);
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();

