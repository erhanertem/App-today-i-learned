import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANONKEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey); //Create our supabase client

export default supabase;
