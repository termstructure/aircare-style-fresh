import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, data } = await req.json()

    switch (action) {
      case 'migrate_static_data':
        return await migrateStaticData(supabase)
      case 'generate_content':
        return await generateContent(supabase, data)
      case 'auto_publish':
        return await autoPublishScheduled(supabase)
      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function migrateStaticData(supabase: any) {
  console.log('Starting blog data migration...')

  // First, create default category and author
  const { data: categoryData, error: categoryError } = await supabase
    .from('blog_categories')
    .upsert({
      name: 'Education',
      slug: 'education',
      description: 'Educational content about air filtration'
    }, { onConflict: 'slug' })
    .select()
    .single()

  if (categoryError) throw categoryError

  const { data: authorData, error: authorError } = await supabase
    .from('blog_authors')
    .upsert({
      name: 'Air Care Expert',
      bio: 'Expert in air filtration and HVAC systems with years of industry experience.'
    }, { onConflict: 'name' })
    .select()
    .single()

  if (authorError) throw authorError

  // Sample blog posts data to migrate
  const samplePosts = [
    {
      title: "The Complete Guide to MERV Ratings: Choosing the Right Filter for Your Home",
      slug: "complete-guide-merv-ratings",
      excerpt: "Understanding MERV ratings is crucial for selecting the right air filter. Learn how different ratings affect air quality, energy efficiency, and system performance.",
      content: `Understanding MERV ratings is crucial for selecting the right air filter for your home. MERV stands for Minimum Efficiency Reporting Value, and it measures how effectively a filter can capture airborne particles.

MERV ratings range from 1 to 20, with higher numbers indicating better filtration capabilities. For residential use, MERV ratings between 8 and 13 are typically recommended.

MERV 8-11 filters are excellent for basic household dust, pollen, and pet dander. They provide good air quality improvement without putting excessive strain on your HVAC system.

MERV 13-16 filters offer superior protection, capturing even smaller particles like bacteria and smoke. However, they may require more frequent changes and can impact airflow if your system isn't designed for high-efficiency filtration.

When choosing a MERV rating, consider your specific needs: Do you have allergies? Pets? Smokers in the home? These factors should influence your decision.

Remember, the highest MERV rating isn't always the best choice. Your HVAC system must be able to handle the increased resistance that comes with higher efficiency filters.`,
      category_id: categoryData.id,
      author_id: authorData.id,
      status: 'published',
      featured: true,
      published_at: new Date('2024-01-15').toISOString(),
      meta_description: 'Complete guide to understanding MERV ratings for air filters'
    },
    {
      title: "5 Signs It's Time to Change Your Air Filter",
      slug: "signs-change-air-filter",
      excerpt: "Recognizing when to change your air filter can save you money and improve your health. Here are the key warning signs you shouldn't ignore.",
      content: `Your air filter works tirelessly to keep your indoor air clean, but how do you know when it's time for a replacement? Here are five clear signs that indicate your filter needs changing:

1. **Visible Dirt and Dust**: If you can see dirt, dust, or debris covering the filter surface, it's definitely time for a change. A clean filter should appear white or off-white.

2. **Reduced Airflow**: Notice that some rooms aren't getting enough heating or cooling? A clogged filter restricts airflow, making your HVAC system work harder.

3. **Increased Energy Bills**: When filters are dirty, your system uses more energy to maintain comfortable temperatures, leading to higher utility costs.

4. **More Dust Around Your Home**: If you're noticing more dust on furniture and surfaces despite regular cleaning, your filter may not be doing its job effectively.

5. **Allergy Symptoms Worsen**: If household members are experiencing more frequent allergies or respiratory issues, a dirty filter could be the culprit.

Don't wait for these signs to appear. Check your filter monthly and replace it every 1-3 months depending on usage, pets, and environmental factors.`,
      category_id: categoryData.id,
      author_id: authorData.id,
      status: 'published',
      featured: false,
      published_at: new Date('2024-01-12').toISOString(),
      meta_description: 'Learn the 5 key signs that indicate when to change your air filter'
    }
  ]

  // Insert sample posts
  const { data: postsData, error: postsError } = await supabase
    .from('blog_posts')
    .upsert(samplePosts, { onConflict: 'slug' })
    .select()

  if (postsError) throw postsError

  console.log('Migration completed successfully')
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Blog data migrated successfully',
      migrated_posts: postsData?.length || 0
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function generateContent(supabase: any, data: any) {
  const { topic, type = 'blog_post', tone = 'informative' } = data

  // This is a simple content generation function
  // In a real implementation, you would integrate with OpenAI or another AI service
  const generatedContent = {
    title: `${topic}: Essential Guide for Homeowners`,
    excerpt: `Discover everything you need to know about ${topic.toLowerCase()} and how it impacts your home's air quality.`,
    content: `# ${topic}: Essential Guide for Homeowners

Understanding ${topic.toLowerCase()} is crucial for maintaining optimal indoor air quality in your home. This comprehensive guide will walk you through everything you need to know.

## What You Need to Know

${topic} plays a vital role in your home's air filtration system. Whether you're a new homeowner or looking to upgrade your current setup, understanding the basics is essential.

## Key Benefits

- Improved air quality
- Better system efficiency  
- Cost savings over time
- Enhanced comfort

## Getting Started

When considering ${topic.toLowerCase()}, start by evaluating your current situation. Consider factors like:

1. Your home's size and layout
2. Any specific air quality concerns
3. Your budget and long-term goals
4. Maintenance requirements

## Conclusion

Investing time to understand ${topic.toLowerCase()} will pay dividends in improved air quality and system performance. Take the first step today by assessing your current setup and identifying areas for improvement.

For more specific guidance, consult with an HVAC professional who can provide personalized recommendations based on your unique situation.`,
    meta_description: `Complete guide to ${topic.toLowerCase()} for better indoor air quality`,
    meta_keywords: [topic.toLowerCase(), 'air quality', 'hvac', 'home improvement']
  }

  return new Response(
    JSON.stringify({ success: true, content: generatedContent }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function autoPublishScheduled(supabase: any) {
  console.log('Publishing scheduled posts...')

  const { data: scheduledPosts, error: fetchError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'scheduled')
    .lte('scheduled_for', new Date().toISOString())

  if (fetchError) throw fetchError

  if (!scheduledPosts || scheduledPosts.length === 0) {
    return new Response(
      JSON.stringify({ success: true, published_count: 0, message: 'No scheduled posts to publish' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('status', 'scheduled')
    .lte('scheduled_for', new Date().toISOString())

  if (updateError) throw updateError

  console.log(`Published ${scheduledPosts.length} scheduled posts`)

  return new Response(
    JSON.stringify({ 
      success: true, 
      published_count: scheduledPosts.length,
      message: `Successfully published ${scheduledPosts.length} scheduled posts`
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}