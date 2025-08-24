export const generateProjectStatusUpdateEmail = (projectTitle, newStatus, name, updatedAt) => {
    return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Project status updated</title>
  <style>
    a[x-apple-data-detectors]{ color:inherit!important; text-decoration:none!important; }
    @media (prefers-color-scheme: dark) {
      .bg { background:#0b0c10!important; }
      .card { background:#121317!important; }
      .text { color:#e8e8ea!important; }
      .muted { color:#b8bac1!important; }
      .divider { border-color:#2a2d36!important; }
      .chip { background:#1e293b!important; color:#e5e7eb!important; border-color:#2a2d36!important; }
      .btn { background:#F33C38!important; color:#ffffff!important; }
    }
  </style>
  <!--[if mso]>
    <style>
      .fallback-font { font-family: Arial, sans-serif !important; }
    </style>
  <![endif]-->
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Preheader (hidden) -->
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
    The status of ${projectTitle} has changed to ${newStatus}.
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;margin:0;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">

        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;" class="card">

          <!-- Brand / Header -->
          <tr>
            <td style="padding:18px 24px;background:#F33C38;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">
                    Stratital Client Portal
                  </td>
                  <td align="right" class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ffeceb;">
                    Status Update
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 28px 6px 28px;">
              <h1 class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;color:#0f172a;font-weight:700;">
                Hi ${name}, your project status changed
              </h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:0 28px 16px 28px;">
              <p class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#1f2937;">
                <strong>${projectTitle}</strong> has been updated by our team.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:8px 28px 0 28px;">
              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:0;">
            </td>
          </tr>

          <!-- Status change block -->
          <tr>
            <td style="padding:16px 28px 8px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
                <tr>
                  <td width="120" class="fallback-font muted" style="padding:6px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;">
                    New Status
                  </td>
                  <td style="padding:6px 0;">
                    <span class="chip fallback-font" style="display:inline-block;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#e6ffed;color:#065f46;font-size:12px;font-weight:700;">
                      ${newStatus}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td width="120" class="fallback-font muted" style="padding:6px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;">
                    Updated At
                  </td>
                  <td class="fallback-font text" style="padding:6px 0;font-size:14px;color:#374151;">
                    ${updatedAt}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Optional note -->
          <tr>
            <td style="padding:4px 28px 20px 28px;">
              <p class="fallback-font muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#6b7280;">
                If you weren’t expecting this change, please reply to this email or contact support.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:18px;background:#f8fafc;">
              <p class="fallback-font muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                Stratital · Australia
              </p>
              <p class="fallback-font muted" style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                Need help? <a href="mailto:support@stratital.com" style="color:#2563eb;text-decoration:none;">support@stratital.com</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
  <!-- /Wrapper -->
</body>
</html>
`;
}