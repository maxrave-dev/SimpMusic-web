import { NextResponse } from 'next/server';

// Cache revalidation: 1 hour
export const revalidate = 3600;

/**
 * Fetch GitHub Sponsors
 * Uses lifetimeReceivedSponsorshipValues to get TOTAL amount paid by each sponsor
 */
async function fetchGitHubSponsors() {
  const token = process.env.GITHUB_SPONSORS_TOKEN;
  if (!token) {
    throw new Error('GITHUB_SPONSORS_TOKEN is not configured');
  }

  let allSponsors = [];
  let hasNextPage = true;
  let cursor = null;

  // Fetch lifetime sponsorship values (total amount each sponsor has paid)
  while (hasNextPage) {
    const query = `
      query($cursor: String) {
        user(login: "maxrave-dev") {
          lifetimeReceivedSponsorshipValues(
            first: 100,
            after: $cursor
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              sponsor {
                ... on User {
                  login
                  name
                  avatarUrl
                  url
                }
                ... on Organization {
                  login
                  name
                  avatarUrl
                  url
                }
              }
              amountInCents
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { cursor }
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GitHub GraphQL error: ${data.errors[0].message}`);
    }

    const pageData = data.data?.user?.lifetimeReceivedSponsorshipValues;
    if (!pageData) break;

    allSponsors.push(...pageData.nodes);
    hasNextPage = pageData.pageInfo.hasNextPage;
    cursor = pageData.pageInfo.endCursor;
  }

  // Convert to donor format
  return allSponsors
    .filter(item => item.sponsor && item.amountInCents > 0)
    .map(item => ({
      name: item.sponsor?.name || item.sponsor?.login || 'Anonymous',
      platform: 'github',
      amount: item.amountInCents / 100, // Convert cents to dollars
      currency: 'USD',
      date: new Date().toISOString(), // Use current date as we don't have specific date from lifetime values
      avatarUrl: item.sponsor?.avatarUrl,
      profileUrl: item.sponsor?.url,
    }));
}

/**
 * Fetch BuyMeACoffee Supporters (One-time donations)
 */
async function fetchBuyMeACoffeeSupporters(apiKey) {
  let allSupporters = [];
  let currentPage = 1;
  let lastPage = 1;

  do {
    const response = await fetch(`https://developers.buymeacoffee.com/api/v1/supporters?page=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`BuyMeACoffee Supporters API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    allSupporters.push(...(json.data || []));
    lastPage = json.last_page || 1;
    currentPage++;

  } while (currentPage <= lastPage);

  return allSupporters;
}

/**
 * Fetch BuyMeACoffee Subscriptions (Recurring memberships)
 */
async function fetchBuyMeACoffeeSubscriptions(apiKey) {
  let allSubscriptions = [];
  let currentPage = 1;
  let lastPage = 1;

  // Fetch all subscriptions (active + inactive)
  do {
    const response = await fetch(`https://developers.buymeacoffee.com/api/v1/subscriptions?status=all&page=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`BuyMeACoffee Subscriptions API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    allSubscriptions.push(...(json.data || []));
    lastPage = json.last_page || 1;
    currentPage++;

  } while (currentPage <= lastPage);

  return allSubscriptions;
}

/**
 * Fetch BuyMeACoffee - Both supporters and subscriptions
 * Aggregates one-time donations + recurring memberships by supporter name
 */
async function fetchBuyMeACoffee() {
  const apiKey = process.env.BUYMEACOFFEE_API_KEY;
  if (!apiKey) {
    throw new Error('BUYMEACOFFEE_API_KEY is not configured');
  }

  // Fetch both one-time supporters and recurring subscriptions in parallel
  const [supporters, subscriptions] = await Promise.all([
    fetchBuyMeACoffeeSupporters(apiKey),
    fetchBuyMeACoffeeSubscriptions(apiKey),
  ]);

  // Aggregate by supporter name
  const supporterMap = new Map();

  // Process one-time donations
  supporters.forEach(supporter => {
    const name = supporter.supporter_name || supporter.payer_name || 'Anonymous';
    const amount = parseFloat(supporter.support_coffees || 1) * parseFloat(supporter.support_coffee_price || 5);

    if (supporterMap.has(name)) {
      supporterMap.get(name).amount += amount;
    } else {
      supporterMap.set(name, {
        name: name,
        platform: 'buymeacoffee',
        amount: amount,
        currency: supporter.support_currency || 'USD',
        date: supporter.support_created_on,
        avatarUrl: null,
        profileUrl: null,
      });
    }
  });

  // Process recurring subscriptions
  // Simply use subscription_coffee_num × subscription_coffee_price
  subscriptions.forEach(subscription => {
    const name = subscription.payer_name || 'Anonymous';
    const amount = parseFloat(subscription.subscription_coffee_num || 1) * parseFloat(subscription.subscription_coffee_price || 5);

    if (supporterMap.has(name)) {
      supporterMap.get(name).amount += amount;
    } else {
      supporterMap.set(name, {
        name: name,
        platform: 'buymeacoffee',
        amount: amount,
        currency: subscription.subscription_currency || 'USD',
        date: subscription.subscription_created_on,
        avatarUrl: null,
        profileUrl: null,
      });
    }
  });

  return Array.from(supporterMap.values());
}

/**
 * Fetch Liberapay Patrons
 * Note: Liberapay does NOT have an official authenticated API
 * Only public endpoint is available with limited aggregate data
 */
async function fetchLiberapay() {
  const username = process.env.LIBERAPAY_USERNAME || 'maxrave-dev';

  // Use public endpoint (no authentication required)
  const response = await fetch(`https://liberapay.com/${username}/public.json`);

  if (!response.ok) {
    throw new Error(`Liberapay API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Public API doesn't expose individual patrons (privacy), only aggregate stats
  // Check if there are any donations/receiving
  if (data.receiving && parseFloat(data.receiving.amount) > 0) {
    return [{
      name: 'Liberapay Community',
      platform: 'liberapay',
      amount: parseFloat(data.receiving.amount),
      currency: data.receiving.currency || 'USD',
      date: new Date().toISOString(),
      avatarUrl: null,
      profileUrl: `https://liberapay.com/${username}`,
    }];
  }

  return [];
}

/**
 * Main API route handler
 */
export async function GET() {
  try {
    // Fetch from GitHub Sponsors and BuyMeACoffee only (exclude Liberapay - no individual donor data)
    const results = await Promise.allSettled([
      fetchGitHubSponsors(),
      fetchBuyMeACoffee(),
    ]);

    const donors = [];
    const errors = {};

    // Process results
    results.forEach((result, index) => {
      const platform = ['github', 'buymeacoffee'][index];

      if (result.status === 'fulfilled') {
        donors.push(...result.value);
      } else {
        errors[platform] = result.reason.message;
        console.error(`Failed to fetch ${platform} donors:`, result.reason);
      }
    });

    // Sort donors by amount (descending)
    donors.sort((a, b) => b.amount - a.amount);

    // Get limit from env (default: 12) - used for client-side display
    const limit = parseInt(process.env.DONORS_DISPLAY_LIMIT || '12', 10);

    return NextResponse.json({
      success: true,
      donors: donors, // Return ALL donors (client will handle limiting)
      errors: Object.keys(errors).length > 0 ? errors : null,
      total: donors.length,
      displayed: limit, // Tell client the default display limit
    });

  } catch (error) {
    console.error('Error fetching donors:', error);

    return NextResponse.json({
      success: false,
      donors: [],
      errors: { general: error.message },
      total: 0,
      displayed: 0,
    }, { status: 500 });
  }
}
