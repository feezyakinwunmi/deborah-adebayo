import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYXVscWxtcGF6bWhzbmtjdmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzY5MTUsImV4cCI6MjA4NjUxMjkxNX0.CkkLCfYOtyFqGRxfjAAiMdhuZ6s_1JHdUKMUkAStbGw"
);