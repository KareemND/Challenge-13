const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // find all tags
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    // send the tags data back to the client
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
    } else {
      // send the tag data back to the client
      res.status(200).json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    // create a new tag
    const tag = await Tag.create(req.body);
    // send the newly created tag back to the client
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // update a tag's name by its `id` value
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
    } else {
      const updatedTag = await tag.update(req.body);
      // send the updated tag back to the client
      res.status(200).json(updatedTag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // delete one tag by its `id` value
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
    } else {
      await tag.destroy();
      res.status(200).json({ message: 'Tag deleted successfully!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
