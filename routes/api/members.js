const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");

const router = express.Router();

// Gets all members
router.get("/", (req, res) => res.json(members));

// Get a single member
router.get("/:id", (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(m => m.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include both name and email" });
  } else {
    members.push(newMember);
    res.json(members);
    // res.redirect("/"); // Redirect user to the same page - index page
  }
});

// Update member - put request
router.put("/:id", (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member updated successfully", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  if (found) {
    const otherMembers = members.filter(m => m.id !== parseInt(req.params.id));
    res.json({ msg: "Member deleted", members: otherMembers });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
