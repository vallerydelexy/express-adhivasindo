// /src/routes/content.js
const express = require('express');
const router = express.Router();
const { authenticate, authorizeInstructor } = require('../middleware/auth');
const {
  listContents,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');

/**
 * @swagger
 * /api/contents:
 *   get:
 *     tags: [Contents]
 *     summary: List contents with pagination and search
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, listContents);

/**
 * @swagger
 * /api/contents:
 *   post:
 *     tags: [Contents]
 *     summary: Create new content
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - schedule
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               schedule:
 *                 type: string
 *                 format: date-time
 */
router.post('/', authenticate, authorizeInstructor, createContent);

router.put('/:id', authenticate, authorizeInstructor, updateContent);
router.delete('/:id', authenticate, authorizeInstructor, deleteContent);

module.exports = router;