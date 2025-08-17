export const formConfig = {
    seo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Top Competitors", name: "topCompetitors", type: "textarea" },
        { label: "Target Locations", name: "targetLocations", type: "text" },
        { label: "Current SEO Issues", name: "currentSeoIssues", type: "textarea" }
    ],

    premiumSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "SEO Goals", name: "seoGoals", type: "textarea", required: true },
        { label: "Budget Range", name: "budgetRange", type: "number", required: true }
    ],

    localSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Business Address", name: "businessAddress", type: "textarea", required: true },
        { label: "Service Area", name: "serviceArea", type: "text", required: true },
        { label: "Google Business Profile Link", name: "googleBusinessProfile", type: "url" }
    ],

    premiumLocalSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Full Address & Service Area", name: "fullAddressServiceArea", type: "textarea", required: true },
        { label: "Google Business Profile Link", name: "googleBusinessProfile", type: "url" },
        { label: "Review Management Preference", name: "reviewManagement", type: "text" }
    ],

    onPageSeo: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Pages to Optimize", name: "pagesToOptimize", type: "textarea", required: true },
        { label: "Target Keywords per Page", name: "keywordsPerPage", type: "textarea", required: true }
    ],

    linkBuilding: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Target Pages", name: "targetPages", type: "textarea" },
        { label: "Preferred Industries for Backlinks", name: "preferredIndustries", type: "text" }
    ],

    geo: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Target Country/Region", name: "targetCountry", type: "text", required: true },
        { label: "Languages Needed", name: "languagesNeeded", type: "text" }
    ],

    appsOptimisation: [
        { label: "App Name", name: "appName", type: "text", required: true },
        { label: "App Store Links", name: "appStoreLinks", type: "textarea", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Main Competitors", name: "mainCompetitors", type: "textarea" }
    ],

    reputationManagement: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url" },
        { label: "Existing Reviews Links", name: "existingReviews", type: "textarea" },
        { label: "Reputation Goals", name: "reputationGoals", type: "textarea", required: true }
    ],

    ppc: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Monthly Ad Budget", name: "monthlyAdBudget", type: "number", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true },
        { label: "Preferred Platforms", name: "preferredPlatforms", type: "text", required: true }
    ],

    socialMediaManagement: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Current Social Links", name: "currentSocialLinks", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true },
        { label: "Posting Frequency", name: "postingFrequency", type: "text" }
    ],

    aiSmManagement: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Social Platforms", name: "socialPlatforms", type: "text", required: true },
        { label: "Automation Goals", name: "automationGoals", type: "textarea", required: true }
    ],

    premiumSmm: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Target Platforms", name: "targetPlatforms", type: "text", required: true },
        { label: "Ad Budget", name: "adBudget", type: "number", required: true },
        { label: "Campaign Goals", name: "campaignGoals", type: "textarea", required: true }
    ],

    smAdvertising: [
        { label: "Platform", name: "platform", type: "text", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true },
        { label: "Ad Budget", name: "adBudget", type: "number", required: true }
    ],

    leadGeneration: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Lead Criteria", name: "leadCriteria", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true }
    ],

    leadFunnel: [
        { label: "Funnel Goal", name: "funnelGoal", type: "textarea", required: true },
        { label: "Lead Source", name: "leadSource", type: "text" }
    ],

    webDesign: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Industry", name: "industry", type: "text", required: true },
        { label: "Preferred Colors", name: "preferredColors", type: "text" },
        { label: "Inspiration Websites", name: "inspirationWebsites", type: "textarea" },
        { label: "Number of Pages", name: "numberOfPages", type: "number", required: true }
    ],

    webDevelopment: [
        { label: "Website Purpose", name: "websitePurpose", type: "textarea", required: true },
        { label: "Core Features", name: "coreFeatures", type: "textarea", required: true },
        { label: "Technology Preference", name: "technologyPreference", type: "text" }
    ],

    websiteMaintenance: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Maintenance Frequency", name: "maintenanceFrequency", type: "text" },
        { label: "Specific Issues", name: "specificIssues", type: "textarea" }
    ],

    websiteLoadingSpeed: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Page Speed Targets", name: "pageSpeedTargets", type: "text" }
    ],

    appsDevelopment: [
        { label: "App Name", name: "appName", type: "text", required: true },
        { label: "Platform", name: "platform", type: "text", required: true },
        { label: "Core Features", name: "coreFeatures", type: "textarea", required: true }
    ],

    graphicDesign: [
        { label: "Design Type", name: "designType", type: "text", required: true },
        { label: "Brand Colors", name: "brandColors", type: "text" },
        { label: "Inspiration", name: "inspiration", type: "textarea" }
    ],

    copywriting: [
        { label: "Content Type", name: "contentType", type: "text", required: true },
        { label: "Word Count", name: "wordCount", type: "number" },
        { label: "Tone of Voice", name: "toneOfVoice", type: "text" }
    ],

    dedicatedResources: [
        { label: "Resource Type", name: "resourceType", type: "text", required: true },
        { label: "Working Hours", name: "workingHours", type: "text", required: true }
    ],

    agencyStarterKit: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Services Needed", name: "servicesNeeded", type: "textarea", required: true }
    ],

    cro: [
        { label: "Website URL", name: "websiteUrl", type: "url", required: true },
        { label: "Current Conversion Rate", name: "currentConversionRate", type: "text" },
        { label: "Main Conversion Goal", name: "mainConversionGoal", type: "textarea", required: true }
    ],

    landingPages: [
        { label: "Landing Page Goal", name: "landingPageGoal", type: "textarea", required: true },
        { label: "Number of Variations", name: "numberOfVariations", type: "number" }
    ],

    emailMarketing: [
        { label: "Email List Size", name: "emailListSize", type: "number", required: true },
        { label: "Campaign Goal", name: "campaignGoal", type: "textarea", required: true }
    ],

    adhocSupport: [
        { label: "Support Type", name: "supportType", type: "text", required: true },
        { label: "Urgency Level", name: "urgencyLevel", type: "text" }
    ],

    crm: [
        { label: "CRM Type", name: "crmType", type: "text", required: true },
        { label: "Number of Users", name: "numberOfUsers", type: "number" },
        { label: "Required Integrations", name: "requiredIntegrations", type: "textarea" }
    ]
}
