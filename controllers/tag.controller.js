const Tag = require('../models/Tag');

// Get all tags
const getTags = async (req, res) => {
    try {
      // Retrieve all tags from database
      const tags = await Tag.find().sort({ createdAt: -1 }).populate('user_id');
  
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  function formatDateTimeDislay(inputString) {
    // Convert input string to JavaScript Date object
    var date = new Date(inputString);

    // Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
    var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
    var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
    var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
    var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero

    // Format the date and time components into a user-friendly string
    var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;

    // Return the formatted date and time string
    return formattedDateTime;
}
  
// Create a new tag
const createTag = async (req, res) => {
    try {
      const {subject, description, start_dateOfTag, end_dateOfTag, end_dateOfIdea, user_id} = req.body;
      // Create new tag object
      const newTag = new Tag({
        subject,
        description,
        start_dateOfTag,
        end_dateOfTag,
        end_dateOfIdea,
        user_id
      });
  
      // Save tag to database
      await newTag.save();
  
      res.status(201).json(newTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Delete a tag by ID
const deleteTag = async (req, res) => {
  try {
    // Check if user exists
    const existingTag = await Tag.findByIdAndDelete(req.params.id).exec();
    if (!existingTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Update Tags
const updateTag = async (req, res) => {
  try {
    const { subject, description, start_dateOfTag, end_dateOfTag, end_dateOfIdea } = req.body;

    // Check if user exists
    const existingTag = await Tag.findByIdAndUpdate(req.params.id).exec();
    if (!existingTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Update tags object
    existingTag.subject = subject;
    existingTag.description = description;
    existingTag.start_dateOfTag = start_dateOfTag;
    existingTag.end_dateOfTag = end_dateOfTag;
    existingTag.end_dateOfIdea = end_dateOfIdea;

    await existingTag.save();
    res.json(existingTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports={
    getTags: getTags,
    createTag: createTag,
    deleteTag: deleteTag,
    updateTag: updateTag,
    getTag:getTag

}