# William Henderson Real Estate Website

A responsive, GitHub-ready static real estate website for South Florida.

## Pages
- Home
- About Us
- Buyers with mortgage calculator and search
- Sellers with home valuation call-to-action
- Rentals with interactive search
- Commercial with interactive search
- Agents
- Blog
- Contact Us with lead capture form

## Launch on GitHub Pages
1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/root`, then save.

## Lead Forms
The forms use a Formspree placeholder:

`https://formspree.io/f/YOUR_FORM_ID`

Create a Formspree account, create a form, and replace `YOUR_FORM_ID` in `index.html` and `contact.html`.

## IDX Integration
This static version includes sample listings and working front-end filters. For live MLS data, connect an IDX provider such as IDX Broker, iHomefinder, Showcase IDX, or your brokerage-approved vendor.

Typical approaches:
- Add the provider's search widget script to Buyers, Rentals, Commercial and Home.
- Replace the sample listing grids with the provider's featured-listing widget.
- Use the provider's hosted property-detail pages or WordPress integration.

A pure GitHub Pages site cannot securely store private MLS API credentials. Use an approved IDX embed, hosted IDX pages, or a secure backend/serverless function.

## Customization Checklist
- Replace sample photography with licensed images.
- Add brokerage logo, legal name and required disclosures.
- Replace placeholder agent portrait.
- Add Fair Housing, Equal Opportunity and MLS attribution language required by your brokerage/MLS.
- Connect Google Analytics and Search Console.
- Add a custom domain through GitHub Pages settings.
