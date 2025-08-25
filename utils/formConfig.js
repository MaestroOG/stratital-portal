export const formConfig = {
    localSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Target Locations (Cities/States)", name: "targetLocations", type: "textarea" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "Google Business Profile Link (Add https:// in front of the URL)", name: "googleBusinessProfile", type: "url" },
    ],

    nationalSeo: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Keywords", name: "targetKeywords", type: "textarea", required: true },
        { label: "Target Locations (Cities/States)", name: "targetLocations", type: "textarea" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
        { label: "Google Business Profile Link (Add https:// in front of the URL)", name: "googleBusinessProfile", type: "url" },
    ],

    linkBuilding: [
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Target Pages", name: "targetPages", type: "textarea" },
        { label: "Preferred Industries for Backlinks", name: "preferredIndustries", type: "text" }
    ],

    googleAdvertising: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Advertising Budget (Monthly)", name: "adBudget", type: "number", required: true },
        { label: "Target Audience (Demographics/Interests)", name: "targetAudience", type: "textarea", required: true },
        { label: "Campaign Goals (Leads, Sales, Traffic, etc.)", name: "campaignGoals", type: "textarea", required: true },
        { label: "Campaign Type", name: "campaignType", type: "text", required: true },
        { label: "Competitor Ads or References", name: "competitorAds", type: "textarea" }
    ],

    socialMediaAdvertising: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url", required: true },
        { label: "Preferred Platforms (Facebook, Instagram, LinkedIn, etc.)", name: "preferredPlatforms", type: "text", required: true },
        { label: "Advertising Budget (Monthly)", name: "adBudget", type: "number", required: true },
        { label: "Target Audience (Demographics/Interests)", name: "targetAudience", type: "textarea", required: true },
        { label: "Campaign Objectives (Awareness, Engagement, Conversions, etc.)", name: "campaignObjectives", type: "textarea", required: true },
        { label: "Existing Social Media Handles", name: "socialMediaHandles", type: "text" }
    ],

    socialMediaManagement: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Existing Social Media Handles", name: "currentSocialLinks", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true },
        { label: "Posting Frequency", name: "postingFrequency", type: "text" }
    ],

    leadGeneration: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Lead Criteria", name: "leadCriteria", type: "textarea", required: true },
        { label: "Target Audience", name: "targetAudience", type: "textarea", required: true }
    ],

    'webDesignAndDevelopment': [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Current Website URL (if any) (Add https:// in front of the URL)", name: "currentWebsite", type: "url" },
        { label: "Type of Website (Business, E-commerce, Portfolio, etc.)", name: "websiteType", type: "text", required: true },
        { label: "Number of Pages (Approximate)", name: "numberOfPages", type: "number" },
        { label: "Design Preferences (Colors, Style, Inspirations)", name: "designPreferences", type: "textarea" },
        { label: "Core Features Needed (e.g., Contact Form, Blog, Payment Gateway)", name: "coreFeatures", type: "textarea", required: true },
        { label: "Budget Range", name: "budgetRange", type: "text", required: true },
        { label: "Deadline / Timeframe", name: "deadline", type: "text" },
        { label: "Competitor Websites", name: "competitorWebsites", type: "textarea" },
    ],

    emailMarketing: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
        { label: "Email Marketing Goal (e.g., Lead Nurturing, Promotions, Newsletters)", name: "marketingGoal", type: "text", required: true },
        { label: "Email List Size (Approximate)", name: "emailListSize", type: "number" },
        { label: "Preferred Email Platform (e.g., Mailchimp, Klaviyo, HubSpot)", name: "emailPlatform", type: "text" },
        { label: "Frequency of Campaigns (e.g., Weekly, Monthly, On-Demand)", name: "campaignFrequency", type: "text" },
        { label: "Special Offers / Promotions to Highlight", name: "specialOffers", type: "textarea" },
        { label: "Design & Branding Preferences", name: "designPreferences", type: "textarea" }
    ],

    virtualAssistanceResources: [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
        { label: "Type of Assistance Needed (Admin, Digital Marketing, Back-End, Other)", name: "assistanceType", type: "text", required: true },
        { label: "Specific Tasks You Want Help With", name: "taskDetails", type: "textarea", required: true },
        { label: "Preferred Working Hours (Your Timezone)", name: "workingHours", type: "text" },
        { label: "Expected Duration (e.g., Ongoing, 3 months, 6 months)", name: "duration", type: "text" },
        { label: "Level of Expertise Required (Beginner, Intermediate, Expert)", name: "expertiseLevel", type: "text" },
        { label: "Communication Tools (e.g., Slack, Email, WhatsApp)", name: "communicationTools", type: "text" }
    ],

    'leadGeneration-ColdCalling': [
        { label: "Business Name", name: "businessName", type: "text", required: true },
        { label: "Business Website URL (Add https:// in front of the URL)", name: "websiteUrl", type: "url" },
        { label: "Target Industry / Market", name: "targetIndustry", type: "text", required: true },
        { label: "Target Audience (e.g., CEOs, Marketing Managers, Small Businesses)", name: "targetAudience", type: "text", required: true },
        { label: "Geographic Location for Calls", name: "targetLocation", type: "text" },
        { label: "Call Script (Provide if available)", name: "callScript", type: "textarea" },
        { label: "Goal of Calls (e.g., Appointments, Sales, Market Research)", name: "callGoal", type: "text", required: true },
        { label: "CRM or Tools Used (if any)", name: "crmTools", type: "text" }
    ],

}


export const pricingConfig = {
    localSeo: {
        pricing: [
            {
                id: "local-seo-single",
                label: "Local SEO - Single Service",
                price: "$450",
                period: "/month",
                description: "Standard local SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    nationalSeo: {
        pricing: [
            {
                id: "national-seo-single",
                label: "National SEO - Single Service",
                price: "$550",
                period: "/month",
                description: "Nationwide SEO optimization"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    linkBuilding: {
        pricing: [
            {
                id: "link-building-single",
                label: "Link Building - Single Service",
                price: "$200",
                period: "/month",
                description: "High-quality backlink acquisition"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    googleAdvertising: {
        pricing: [
            {
                id: "google-ads-single",
                label: "Google Advertising - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete Google Ads management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaAdvertising: {
        pricing: [
            {
                id: "social-ads-single",
                label: "Social Media Advertising - Single Service",
                price: "$450",
                period: "/month",
                description: "Targeted social media campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    socialMediaManagement: {
        pricing: [
            {
                id: "social-mgmt-single",
                label: "Social Media Management - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete social media management"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    leadGeneration: {
        pricing: [
            {
                id: "lead-gen-single",
                label: "Lead Generation - Single Service",
                price: "$450",
                period: "/month",
                description: "Comprehensive lead generation"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    webDesignAndDevelopment: {
        pricing: [
            {
                id: "web-dev-small",
                label: "Up to 5 Pages - Single Service",
                price: "$850",
                period: "one-time",
                description: "Small website development"
            },
            {
                id: "web-dev-medium",
                label: "6-10 Pages - Single Service",
                price: "$950",
                period: "one-time",
                description: "Medium website development"
            },
            {
                id: "web-dev-large",
                label: "11-15 Pages - Single Service",
                price: "$1400",
                period: "one-time",
                description: "Large website development"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    emailMarketing: {
        pricing: [
            {
                id: "email-single",
                label: "Email Marketing - Single Service",
                price: "$450",
                period: "/month",
                description: "Complete email marketing campaigns"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    virtualAssistanceResources: {
        pricing: [
            {
                id: "va-20h-single",
                label: "20 Hours/Month - Single Resource",
                price: "$500",
                period: "/month",
                description: "Part-time virtual assistance"
            },
            {
                id: "va-40h-single",
                label: "40 Hours/Month - Single Resource",
                price: "$900",
                period: "/month",
                description: "Full-time virtual assistance"
            },
            {
                id: "va-80h-single",
                label: "80 Hours/Month - Single Resource",
                price: "$1600",
                period: "/month",
                description: "Extended virtual assistance"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    },

    'leadGeneration-ColdCalling': {
        pricing: [
            {
                id: "cold-call-20h-single",
                label: "Single Resource",
                price: "$1500",
                period: "/month",
                description: "Part-time cold calling service"
            },
            {
                id: "custom-bundle",
                label: "Custom Quote",
                price: "custom",
                period: "",
                description: ""
            },
        ]
    }
}