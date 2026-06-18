import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('cases').insert([{
    case_number: 'PW-TEST-' + Math.floor(Math.random() * 1000),
    reporter_id: '123e4567-e89b-12d3-a456-426614174000', // random uuid
    animal_type: 'Unknown (Pending Triage)', 
    severity: 'High',
    status: 'Reported',
    location: 'POINT(72.8777 19.0760)',
  }]);
  console.log("Error:", error);
}

test();
