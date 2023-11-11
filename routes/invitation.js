const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');
const invites = require('../models/invite');
const { isAdmin } = require('../middlewares/isAdmin');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/invite-user', verifyToken, isAdmin,async  (req, res) => {
    
  console.log(invites.findInviteByEmail(req.body.email));
  if (await invites.findInviteByEmail(req.body.email) ) {
    return res.status(400).json({ error: 'User already invited' });
  }

  const inviteLink = invitationController.generateInviteLink(req.body.email);

  res.status(200).json({ inviteLink });
});


router.get('/accept-invite', async (req, res) => {
  const { token } = req.query;
  const invite = await invites.findInviteByToken(token);
  if (!invite) {
    return res.status(400).json({ error: 'Invalid invitation link' });
  } 
  invites.removeInvite(invite);
  res.status(200).json({ message: 'Invitation accepted successfully' });
});

module.exports = router;
