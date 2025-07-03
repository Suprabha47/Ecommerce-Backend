const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  console.log("tried uploading?");
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded!" });
    res.status(201).json({
      message: "File Uploaded!",
      imageUrl: `/productImages/${req.file.filename}`,
    });
  } catch (err) {
    console.log("error in uploading: ", err);
    res.status(500).send(err);
  }
});
// image to be uploaded at: http://localhost:3001/api/upload/

router.get("/:fileName", (req, res) => {
  const file = req.params.fileName;
});
// image available at: http://localhost:3001/productImages/1751525946372-blackChino.jpg

module.exports = router;
