exports.notFound = (req, res, next) => {
    // When the page doesnt exists
    res.status(404).render("404.ejs", {
      pageTitle: "Not Found",
      isAuthenticated: false,
    });
  };