export const generateTaskOverdueEmail = (task) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Overdue Task Notification</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f7f7f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f7f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color:#F33C38; color:#ffffff; text-align:center; padding:16px 0; font-size:20px; font-weight:bold;">
              ⚠️ Task Overdue
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 12px;">The following task is overdue:</p>
              <p style="margin:0 0 8px;"><strong>Title:</strong> ${task.title}</p>
              <p style="margin:0 0 8px;"><strong>Due Date:</strong> ${task.dueDate.toDateString()}</p>
              <p style="margin:0 0 8px;"><strong>Created By:</strong> ${task.createdBy.email}</p>
              <p style="margin:0 0 16px;"><strong>Description:</strong> ${task.description || "No description"}</p>
              <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
              <p style="font-size:13px; color:#666; margin:0;">Please review and take necessary action as soon as possible.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f1f1f1; text-align:center; padding:16px; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} Stratital. All rights reserved.
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