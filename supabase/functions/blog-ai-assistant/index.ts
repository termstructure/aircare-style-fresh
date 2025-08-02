import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// Constants for Claude 4 Sonnet pricing (per 1M tokens)
const CLAUDE_INPUT_COST_PER_MILLION = 3.00; // $3 per 1M input tokens for Claude 4 Sonnet
const CLAUDE_OUTPUT_COST_PER_MILLION = 15.00; // $15 per 1M output tokens for Claude 4 Sonnet
const DEFAULT_MONTHLY_BUDGET = 18.00; // $18 monthly budget (with $2 buffer)
const DEFAULT_DAILY_REQUEST_LIMIT = 15; // 15 requests per day max

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
      case 'get_usage_stats':
        return await getUsageStats(supabase)
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

// Helper function to check budget and daily limits
async function checkBudgetLimits(supabase: any) {
  const monthYear = new Date().toISOString().slice(0, 7); // "2025-01"
  const today = new Date().toISOString().slice(0, 10); // "2025-01-02"
  const monthlyBudget = parseFloat(Deno.env.get('MONTHLY_AI_BUDGET_LIMIT') || DEFAULT_MONTHLY_BUDGET.toString());
  const dailyLimit = parseInt(Deno.env.get('DAILY_REQUEST_LIMIT') || DEFAULT_DAILY_REQUEST_LIMIT.toString());

  // Check monthly budget
  const { data: monthlyUsage, error: monthlyError } = await supabase
    .from('ai_usage_tracking')
    .select('total_cost_usd, total_requests')
    .eq('month_year', monthYear)
    .single();

  if (monthlyError && monthlyError.code !== 'PGRST116') throw monthlyError;

  const currentMonthlyCost = monthlyUsage?.total_cost_usd || 0;
  if (currentMonthlyCost >= monthlyBudget) {
    throw new Error(`Monthly budget of $${monthlyBudget} exceeded. Current usage: $${currentMonthlyCost.toFixed(4)}`);
  }

  // Check daily request limit
  const { data: dailyRequests, error: dailyError } = await supabase
    .from('ai_request_logs')
    .select('id', { count: 'exact' })
    .gte('created_at', `${today}T00:00:00Z`)
    .lt('created_at', `${today}T23:59:59Z`);

  if (dailyError) throw dailyError;

  const todayRequestCount = dailyRequests?.length || 0;
  if (todayRequestCount >= dailyLimit) {
    throw new Error(`Daily request limit of ${dailyLimit} exceeded. Current requests today: ${todayRequestCount}`);
  }

  return {
    remainingBudget: monthlyBudget - currentMonthlyCost,
    remainingRequests: dailyLimit - todayRequestCount,
    currentMonthlyCost,
    todayRequestCount
  };
}

// Helper function to calculate token costs
function calculateTokenCost(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1000000) * CLAUDE_INPUT_COST_PER_MILLION;
  const outputCost = (outputTokens / 1000000) * CLAUDE_OUTPUT_COST_PER_MILLION;
  return inputCost + outputCost;
}

// Helper function to log usage
async function logUsage(supabase: any, requestType: string, inputTokens: number, outputTokens: number, cost: number, success: boolean, errorMessage?: string) {
  const monthYear = new Date().toISOString().slice(0, 7);

  // Log individual request
  await supabase
    .from('ai_request_logs')
    .insert({
      request_type: requestType,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: cost,
      model_used: 'claude-sonnet-4-20250514',
      success,
      error_message: errorMessage
    });

  if (success) {
    // Update monthly tracking
    await supabase
      .from('ai_usage_tracking')
      .upsert({
        month_year: monthYear,
        total_requests: 1,
        total_input_tokens: inputTokens,
        total_output_tokens: outputTokens,
        total_cost_usd: cost
      }, {
        onConflict: 'month_year',
        ignoreDuplicates: false
      });
  }
}

async function generateContent(supabase: any, data: any) {
  const { topic, type = 'blog_post', tone = 'informative', save_to_db = false } = data
  const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

  if (!anthropicApiKey) {
    throw new Error('Anthropic API key not configured')
  }

  // Check budget limits before proceeding
  try {
    const budgetStatus = await checkBudgetLimits(supabase);
    console.log(`Budget check passed. Remaining: $${budgetStatus.remainingBudget.toFixed(4)}, Requests today: ${budgetStatus.todayRequestCount}`);
  } catch (budgetError) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Budget limit exceeded', 
        details: budgetError.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 429 
      }
    );
  }

  try {
    const systemPrompt = `You are an expert content writer specializing in air filtration, HVAC systems, and indoor air quality. You write for a company that sells air filters and related products.

Your task is to create SEO-optimized blog content that is:
- Educational and informative
- Practical and actionable
- Well-structured with proper headings
- Optimized for search engines
- Engaging for homeowners
- Professional but accessible

Content should include:
- Clear, descriptive headings (H2, H3)
- Actionable tips and advice
- Benefits and solutions
- Internal linking opportunities (mention related topics)
- Strong introduction and conclusion
- Call-to-action where appropriate

Always focus on helping readers make informed decisions about air quality and filtration systems.`

    const userPrompt = `Create a comprehensive blog post about "${topic}" with the following specifications:

Type: ${type}
Tone: ${tone}

Please provide the response in this exact JSON format:
{
  "title": "SEO-optimized title (60 characters or less)",
  "excerpt": "Compelling excerpt that summarizes the post (150-160 characters)",
  "content": "Full blog post content in markdown format with proper headings, at least 800 words",
  "meta_description": "SEO meta description (150-160 characters)",
  "meta_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Make sure the content is specific to air filtration and HVAC topics, includes practical advice, and is optimized for search engines.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `${systemPrompt}\n\n${userPrompt}`
          }
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`)
    }

    const claudeResponse = await response.json()
    const generatedText = claudeResponse.content[0].text

    // Calculate token usage and cost
    const inputTokens = claudeResponse.usage?.input_tokens || 0;
    const outputTokens = claudeResponse.usage?.output_tokens || 0;
    const requestCost = calculateTokenCost(inputTokens, outputTokens);

    // Parse the JSON response from Claude
    let generatedContent
    try {
      generatedContent = JSON.parse(generatedText)
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', generatedText)
      // Log failed request
      await logUsage(supabase, 'generate_content', inputTokens, outputTokens, requestCost, false, 'Failed to parse JSON response');
      throw new Error('Failed to parse generated content')
    }

    // Validate the response structure
    if (!generatedContent.title || !generatedContent.content || !generatedContent.excerpt) {
      await logUsage(supabase, 'generate_content', inputTokens, outputTokens, requestCost, false, 'Missing required fields in response');
      throw new Error('Generated content is missing required fields')
    }

    // Log successful request
    await logUsage(supabase, 'generate_content', inputTokens, outputTokens, requestCost, true);

    let postId = null;

    // Save to database if requested
    if (save_to_db) {
      try {
        // Generate slug from title
        const { data: slugData, error: slugError } = await supabase.rpc('generate_slug', {
          title: generatedContent.title
        });

        if (slugError) throw slugError;
        const slug = slugData;

        // Get default category and author
        const { data: categoryData, error: categoryError } = await supabase
          .from('blog_categories')
          .select('id')
          .limit(1)
          .single();

        const { data: authorData, error: authorError } = await supabase
          .from('blog_authors')
          .select('id')
          .limit(1)
          .single();

        if (categoryError) console.warn('No categories found:', categoryError);
        if (authorError) console.warn('No authors found:', authorError);

        // Insert the blog post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .insert({
            title: generatedContent.title,
            slug: slug,
            excerpt: generatedContent.excerpt,
            content: generatedContent.content,
            meta_description: generatedContent.meta_description,
            meta_keywords: generatedContent.meta_keywords,
            category_id: categoryData?.id || null,
            author_id: authorData?.id || null,
            status: 'draft'
          })
          .select()
          .single();

        if (postError) throw postError;
        postId = postData.id;

        console.log(`Saved generated content to database with ID: ${postId}`);
      } catch (dbError) {
        console.error('Error saving to database:', dbError);
        // Still return the generated content even if DB save fails
      }
    }

    console.log(`Generated content for topic: ${topic}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        content: generatedContent,
        post_id: postId,
        saved_to_db: save_to_db && postId !== null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating content with Claude:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to generate content', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
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

async function getUsageStats(supabase: any) {
  const monthYear = new Date().toISOString().slice(0, 7);
  const today = new Date().toISOString().slice(0, 10);
  const monthlyBudget = parseFloat(Deno.env.get('MONTHLY_AI_BUDGET_LIMIT') || DEFAULT_MONTHLY_BUDGET.toString());
  const dailyLimit = parseInt(Deno.env.get('DAILY_REQUEST_LIMIT') || DEFAULT_DAILY_REQUEST_LIMIT.toString());

  try {
    // Get monthly usage
    const { data: monthlyUsage, error: monthlyError } = await supabase
      .from('ai_usage_tracking')
      .select('*')
      .eq('month_year', monthYear)
      .single();

    if (monthlyError && monthlyError.code !== 'PGRST116') throw monthlyError;

    // Get daily request count
    const { data: dailyRequests, error: dailyError } = await supabase
      .from('ai_request_logs')
      .select('id', { count: 'exact' })
      .gte('created_at', `${today}T00:00:00Z`)
      .lt('created_at', `${today}T23:59:59Z`);

    if (dailyError) throw dailyError;

    const currentMonthlyCost = monthlyUsage?.total_cost_usd || 0;
    const todayRequestCount = dailyRequests?.length || 0;

    return new Response(
      JSON.stringify({
        success: true,
        stats: {
          monthlyBudget,
          currentMonthlyCost,
          remainingBudget: monthlyBudget - currentMonthlyCost,
          totalMonthlyRequests: monthlyUsage?.total_requests || 0,
          dailyLimit,
          todayRequestCount,
          remainingDailyRequests: dailyLimit - todayRequestCount,
          monthYear,
          totalInputTokens: monthlyUsage?.total_input_tokens || 0,
          totalOutputTokens: monthlyUsage?.total_output_tokens || 0,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error getting usage stats:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to get usage stats', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
}