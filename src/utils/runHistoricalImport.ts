import { supabase } from "@/integrations/supabase/client";

export async function runHistoricalImport() {
  try {
    console.log('Starting historical orders import...');
    
    const { data, error } = await supabase.functions.invoke('import-historical-orders');
    
    if (error) {
      console.error('Import error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Import completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: error.message };
  }
}

// Auto-run the import
runHistoricalImport().then(result => {
  console.log('Historical import result:', result);
});