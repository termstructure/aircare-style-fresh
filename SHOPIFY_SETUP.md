# Shopify Integration Setup Guide

## Step 1: Get Your Shopify Storefront Access Token

1. Log into your Shopify Admin at https://admin.shopify.com
2. Go to Apps > Develop apps > Create an app
3. Name it "Frontend Integration" 
4. Click "Configure Storefront API scopes"
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_content`

6. Save and install the app
7. Copy the "Storefront access token"

## Step 2: Update Configuration

1. Open `src/lib/shopify.ts`
2. Replace `'your-storefront-access-token'` with your actual token
3. Verify your shop domain is correct (`aircaresupplyco.myshopify.com`)

## Step 3: Organize Your Shopify Products

### Create Collections:
- **air-filters** - Main collection for all air filters
- **hepa-filters** - Subcategory if needed
- **pleated-filters** - Subcategory if needed

### Product Organization:
Each product should have:
- **Title**: Clear product name
- **Product Type**: "Air Filter"
- **Vendor**: Brand name (3M, HDX, etc.)
- **Tags**: MERV rating, size, features (e.g., "merv-13", "20x25x1", "hepa")
- **Variants**: Different sizes if applicable
- **Images**: High-quality product photos
- **Description**: Detailed product information

### Recommended Product Fields:
- **SKU**: Unique identifier
- **Inventory tracking**: Enabled
- **Weight**: For shipping calculations
- **SEO title and description**: For better search

## Step 4: Import Existing Product Data

Use the CSV import feature in Shopify:
1. Go to Products > Import
2. Use the provided template
3. Map your existing product data

## Step 5: Test Integration

1. Start your development server
2. Check the browser console for any API errors
3. Verify products are loading on the Air Filters page
4. Test the cart functionality

## Optional: Advanced Setup

### Product Metafields:
Add custom fields for:
- MERV Rating
- Filter Dimensions
- Filtration Efficiency
- Recommended Replacement Frequency

### Automated Collections:
Set up automated collections based on:
- Product tags (MERV ratings)
- Product type
- Vendor

## Troubleshooting

### Common Issues:
1. **"Storefront access token invalid"** - Check token and permissions
2. **Products not loading** - Verify collection handles match
3. **Cart errors** - Check checkout scopes are enabled
4. **CORS errors** - Ensure domain is added to Shopify app settings

### Support:
- Shopify Partner Documentation: https://shopify.dev/docs
- Storefront API Reference: https://shopify.dev/docs/api/storefront