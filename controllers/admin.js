exports.postCreateCollect = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  return res.render("addcollection.ejs", {
    pageTitle: "Add Collection",
    userId: id,
  });
};

exports.saveCollect = (req, res, next) => {
  const { id, title, description } = req.body;
  console.log(id);
};
