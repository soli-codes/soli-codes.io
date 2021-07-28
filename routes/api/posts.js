const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/user');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route  Profile api/posts
// @desc   Create a post
// @access Private (Admin only)
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty(),
            check('title', 'Title is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await User.findById(req.user.id).select('-password');
        if (user.type != 'administrator') {
            return res
                .status(404)
                .send('Must be administrator to make blog post.');
        }
        try {
            const newPost = new Post({
                text: req.body.text,
                title: req.body.title,
                tags: req.body.tags,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
