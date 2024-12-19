// /src/controllers/contentController.js
const prisma = require('../config/db');

const listContents = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.content.count({ where }),
    ]);

    res.json({
      data: contents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createContent = async (req, res) => {
  try {
    const { title, description, schedule } = req.body;
    const content = await prisma.content.create({
      data: {
        title,
        description,
        schedule: new Date(schedule),
        authorId: req.user.id,
      },
    });
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, schedule } = req.body;
    
    const content = await prisma.content.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        schedule: new Date(schedule),
      },
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.content.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  listContents,
  createContent,
  updateContent,
  deleteContent,
};