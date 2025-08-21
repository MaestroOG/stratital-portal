export const generatePartnershipEmailTemplate = (email, monthlyProjectVolume, name, position, phoneNum, contactEmail, companyName, abn, companyWebsite, businessAddress, yearsInBiz, numOfActiveClients, companyStructure, serviceModel, isUsingWhiteLabelProvider, primaryServices, industriesWorkWith, regionsServe, challengeDetail) => {
  return `
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Partner Application</title>
    <style>
      @media only screen and (max-width: 620px) {
        .container { width: 100% !important; }
        .content { padding: 20px !important; }
        .h1 { font-size: 22px !important; }
        .cell-label { width: 40% !important; }
      }
      a { text-decoration: none; }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111827;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fb;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680" class="container" style="width:680px; max-width:100%; background:#ffffff; border-radius:14px; box-shadow:0 6px 22px rgba(17,24,39,.10); overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:#F33C38; padding:28px;">
                <h1 class="h1" style="margin:0; color:#ffffff; font-size:26px; line-height:1.3; font-weight:800;">
                  New Partner Application
                </h1>
                <p style="margin:6px 0 0; color:#cbd5e1; font-size:13px;">
                  Submitted via Stratital Portal
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="content" style="padding:32px;">
                <p style="margin:0 0 18px; font-size:15px; color:#374151;">
                  Please review the details below.
                </p>

                <!-- Details Table -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-size:14px;">
                  <!-- Account -->
                  <tr>
                    <td colspan="2" style="padding:12px 0; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Account
                    </td>
                  </tr>
                  <tr>
                    <td class="cell-label" style="width:260px; padding:10px 0; color:#6b7280;">Email</td>
                    <td style="padding:10px 0; color:#111827;">${email}</td>
                  </tr>
                  <!-- Primary Contact -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Primary Contact
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Name</td>
                    <td style="padding:10px 0; color:#111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Position / Title</td>
                    <td style="padding:10px 0; color:#111827;">${position}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Phone Number</td>
                    <td style="padding:10px 0; color:#111827;">${phoneNum}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Accounts Contact Email</td>
                    <td style="padding:10px 0; color:#111827;">${contactEmail}</td>
                  </tr>

                  <!-- Agency Details -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Agency Details
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Agency Name</td>
                    <td style="padding:10px 0; color:#111827;">${companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">ABN</td>
                    <td style="padding:10px 0; color:#111827;">${abn}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Company Website</td>
                    <td style="padding:10px 0; color:#111827;">
                      <a href=${companyWebsite} target="_blank" style="color:#2563eb;">${companyWebsite}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Business Address</td>
                    <td style="padding:10px 0; color:#111827;">${businessAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Years in Business</td>
                    <td style="padding:10px 0; color:#111827;">${yearsInBiz}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Approx. Active Clients</td>
                    <td style="padding:10px 0; color:#111827;">${numOfActiveClients}</td>
                  </tr>

                  <!-- Structure & Model -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Structure & Model
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Company Structure</td>
                    <td style="padding:10px 0; color:#111827;">${companyStructure}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Typical Service Model</td>
                    <td style="padding:10px 0; color:#111827;">${serviceModel}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Uses White Label Provider?</td>
                    <td style="padding:10px 0; color:#111827;">${isUsingWhiteLabelProvider.toUpperCase()}</td>
                  </tr>

                  <!-- Services & Markets -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Services & Markets
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Primary Services</td>
                    <td style="padding:10px 0; color:#111827;">${primaryServices}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Industries Worked With</td>
                    <td style="padding:10px 0; color:#111827;">${industriesWorkWith}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Regions Served</td>
                    <td style="padding:10px 0; color:#111827;">${regionsServe}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Monthly Project Volume</td>
                    <td style="padding:10px 0; color:#111827;">${monthlyProjectVolume}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Challenges Detail</td>
                    <td style="padding:10px 0; color:#111827;">
                      ${challengeDetail}
                    </td>
                  </tr>
                </table>

                      <p style="margin:14px 0 0; font-size:12px; color:#6b7280;">
                        Manage this request in the <a href="http://stratital-portal.vercel.app/login" style="color:#2563eb;">Portal</a>.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:16px 24px; font-size:12px; color:#6b7280; text-align:center;">
                Stratital • Automated Notification • Please do not reply
              </td>
            </tr>
          </table>

          <!-- Spacer -->
          <div style="height:24px; line-height:24px;">&nbsp;</div>
        </td>
      </tr>
    </table>
  </body>
</html>
        `
}

export const generateAcceptEmailTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Partnership Accepted - Stratital</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6fa; color:#333;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
    <!-- Header -->
    <tr>
      <td align="center" style="background-color:#F33C38; padding:30px;">
        <h1 style="margin:0; font-size:28px; color:#ffffff; font-weight:bold;">Stratital</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="margin:0; font-size:22px; color:#0d47a1; font-weight:600;">🎉 Congratulations!</h2>
        <p style="font-size:16px; line-height:1.6; margin-top:15px;">
          We’re excited to let you know that your request for a <strong>partnership with Stratital</strong> has been <span style="color:green; font-weight:bold;">accepted</span>.
        </p>
        <p style="font-size:16px; line-height:1.6;">
          You can now access your account and explore the <strong>Client Portal</strong>, where you’ll find all the tools and resources you need to get started.
        </p>

        <!-- Call to Action -->
        <div style="text-align:center; margin:30px 0;">
          <a href="https://portal.stratital.com/login" target="_blank" 
             style="background-color:#F33C38; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-size:16px; font-weight:600; display:inline-block;">
             Log In to Client Portal
          </a>
        </div>

        <p style="font-size:15px; line-height:1.6; color:#555;">
          Thank you for trusting Stratital. We’re excited to begin this journey with you.  
          If you have any questions or need help, feel free to reach out to our support team anytime.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background-color:#f0f3f9; padding:20px;">
        <p style="margin:0; font-size:13px; color:#777;">
          © 2025 Stratital. All rights reserved.<br/>
          <a href="https://stratital.com" style="color:#0d47a1; text-decoration:none;">Visit our website</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}


export const generateRejectEmailTemplate = () => {
  return `
    <!DOCTYPE html>
<html lang="en" style="background:#f4f6fa;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Partnership Application – Stratital</title>
</head>
<body style="margin:0; padding:24px; background:#f4f6fa; font-family:Arial, Helvetica, sans-serif; color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(17,24,39,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#F33C38; padding:28px;">
              <h1 style="margin:0; font-size:26px; line-height:1.3; color:#ffffff; font-weight:800;">
                Stratital
              </h1>
              <p style="margin:6px 0 0; color:#cfe0ff; font-size:13px;">
                Partnership Application Update
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 10px; font-size:22px; color:#F33C38; font-weight:700;">
                Application Status: Not Approved
              </h2>
              <p style="margin:10px 0 14px; font-size:15px; line-height:1.6; color:#374151;">
                Hi there,  
                Thank you for your interest in partnering with <strong>Stratital</strong>. After careful review,
                we’re unable to proceed with your application at this time.
              </p>
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">
                We truly appreciate the time you took to apply. You’re welcome to reapply in the future, especially if
                there are updates to your services, portfolio, or business details that may strengthen your fit.
              </p>

              <!-- Optional reason block (hide/remove if not used) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; margin:16px 0;">
                <tr>
                  <td style="padding:16px 18px; font-size:14px; color:#374151;">
                    <strong style="display:inline-block; margin-bottom:6px; color:#111827;">Why this decision?</strong><br/>
                    Our review considers current program capacity, service alignment, and quality requirements.
                    Unfortunately, we weren’t able to confirm a fit at this time.
                  </td>
                </tr>
              </table>

              <p style="margin:12px 0 0; font-size:13px; color:#6b7280; text-align:center;">
                If you have additional information you’d like us to consider, please reply to this email or reach out to our team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f3f9; padding:16px 24px; text-align:center; font-size:12px; color:#6b7280;">
              © 2025 Stratital • This is an automated notification
            </td>
          </tr>
        </table>

        <!-- Spacer -->
        <div style="height:24px; line-height:24px;">&nbsp;</div>
      </td>
    </tr>
  </table>
</body>
</html>

    `;
}


export const generateProjectCreatedEmailTemplate = (companyName, projectTitle, service, packageSelected) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Project Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px; background:#F33C38; border-top-left-radius:12px; border-top-right-radius:12px; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">New Project Created</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#111827;">
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6;">
                A new project has been successfully created with the following details:
              </p>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px; font-size:15px;">
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Company Name:</td>
                  <td style="padding:8px 0; color:#374151;">${companyName}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Project Title:</td>
                  <td style="padding:8px 0; color:#374151;">${projectTitle}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Service:</td>
                  <td style="padding:8px 0; color:#374151;">${service.replace(/([a-z])([A-Z][a-z])/g, "$1 $2").replace(/([a-z])([A-Z]+$)/g, "$1 $2").replace(/^./, (s) => s.toUpperCase()).trim()}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Package Selected:</td>
                  <td style="padding:8px 0; color:#374151;">${packageSelected}</td>
                </tr>
              </table>

              <p style="margin:0; font-size:14px; color:#6b7280;">
                You can view and manage this project from your dashboard.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px; background:#f3f4f6; border-bottom-left-radius:12px; border-bottom-right-radius:12px; font-size:13px; color:#6b7280;">
              © 2025 Stratital. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>

  `;
}