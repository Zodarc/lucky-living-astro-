/**
 * pricing.ts
 *
 * Single entry point for live product pricing.
 *
 * CURRENT STATE: stub — always returns null.
 *
 * TO ACTIVATE (Amazon PA-API):
 *   1. Reach 3 qualifying sales in your Associate account so PA-API access
 *      is approved (typically takes 180 days from account creation).
 *   2. Retrieve your Access Key, Secret Key, and Partner Tag from
 *      https://affiliate-program.amazon.com → Tools → Product Advertising API.
 *   3. Install the official SDK:
 *        npm install @amazon-pa-api50/sdk
 *   4. Replace the stub body below with a PA-API GetItems call:
 *        import { DefaultApi, Configuration } from '@amazon-pa-api50/sdk';
 *        const api = new DefaultApi(new Configuration({ ... }));
 *        const res = await api.getItems({ ItemIds: [asin], Resources: ['Offers.Listings.Price'] });
 *        return res.ItemsResult.Items[0]?.Offers?.Listings?.[0]?.Price?.Amount ?? null;
 *   5. Update priceLastVerified in each product .md file to 'live' or
 *      remove it and let the pipeline stamp it automatically.
 *
 * NOTE: PA-API has strict caching requirements (prices must not be cached
 * longer than 24 hours per the Associates Program Operating Agreement).
 * Wire this through an ISR/edge function, not static build-time calls.
 */

/**
 * Fetch the current retail price for an Amazon product by ASIN.
 *
 * @param asin - Amazon Standard Identification Number (e.g. "B07XJ8C8F7")
 * @returns Price in USD as a float (e.g. 99.99), or null if unavailable
 */
export async function getLivePrice(asin: string): Promise<number | null> {
  // TODO: wire to Amazon PA-API once Associate account has 3 qualifying sales
  // and PA-API access is approved. Returns null until then.
  void asin; // suppress unused-variable lint warning on the stub
  return null;
}
