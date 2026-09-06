const RECIPIENT = 'taoufiq.maroub25@gmail.com';

function doPost(e) {
  try {
    const data = e.parameter || {};
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const subject = String(data.subject || '').trim();
    const message = String(data.message || '').trim();

    if (!name || !email || !subject || !message) {
      return jsonResponse({ success: false, message: 'All fields are required.' });
    }

    GmailApp.sendEmail(RECIPIENT, subject, [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message
    ].join('\n'), {
      name: 'Portfolio contact form',
      replyTo: email
    });

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, message: error.message });
  }
}

function doGet() {
  return jsonResponse({ success: true, message: 'Contact endpoint is ready.' });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
