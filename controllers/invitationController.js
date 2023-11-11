
const crypto = require('crypto');
const invites = require('../models/invite');

function generateInviteLink(email) {
  const inviteToken = crypto.randomBytes(16).toString('hex');

  invites.addInvite({ email, token: inviteToken });

  const inviteLink = `http://domain.com/accept-invite?token=${inviteToken}`;

  return inviteLink;
}

module.exports = { generateInviteLink };
