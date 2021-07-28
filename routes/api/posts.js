const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// @route  POST api/posts
// @desc   Create a post
// @access Private (Admin only)
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty(),
            check('title', 'Title is required').not().isEmpty(),
            check('type', 'Must be administrator').isIn('administrator'),
        ],
    ],
    async (req, res) => {}
);
