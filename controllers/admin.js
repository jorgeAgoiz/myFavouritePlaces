// User model and Packages
const User = require("../models/user");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const { validationResult } = require("express-validator");

exports.postCreateCollect = (req, res, next) => {
  const id = req.user._id;
  return res.render("addcollection.ejs", {
    pageTitle: "Add Collection",
    userId: id,
    errorMessage: null,
    isAuthenticated: true,
  });
};

exports.postSaveCollect = (req, res, next) => {
  const { title, description } = req.body;
  const id = req.user._id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("addcollection.ejs", {
      pageTitle: "Add Collection",
      errorMessage: errors.array()[0].msg,
      userId: id,
      isAuthenticated: true,
    });
  }

  User.findByIdAndUpdate(id, {
    $push: { collections: { title: title, description: description } },
  })
    .then((result) => {
      if (!result) {
        return res.redirect(`/usermenu`);
      } else {
        return res.redirect(`/usermenu`);
      }
    })
    .catch((err) => console.log(err));
};

exports.postShowCollect = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }

      return res.render("showcollection.ejs", {
        pageTitle: "My Collections",
        collects: user.collections,
        userId: user._id,
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddPlace = (req, res, next) => {
  const { collectId } = req.body;
  const userId = req.user._id;
  return res.render("addplace.ejs", {
    pageTitle: "Save Place",
    collectId: collectId,
    userId: userId,
    isAuthenticated: true,
    editMode: false,
    errorMessage: null,
  });
};

exports.postSavePlace = async (req, res, next) => {
  const { collectId, name, direction, comments } = req.body;
  const userId = req.user._id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("addplace.ejs", {
      pageTitle: "Save Place",
      collectId: collectId,
      userId: userId,
      isAuthenticated: true,
      editMode: false,
      errorMessage: errors.array()[0].msg,
    });
  }

  const coordinates = await client.geocode({
    params: {
      address: direction,
      key: process.env.MAPS_API_KEY,
    },
  });

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }
      let arrayColl = user.collections;
      let newPlace = arrayColl.find(
        (coll) => coll._id.toString() === collectId.toString()
      );

      const lat = coordinates.data.results[0].geometry.location.lat;
      const long = coordinates.data.results[0].geometry.location.lng;

      newPlace.places.push({
        name: name,
        direction: direction,
        latitude: lat,
        length: long,
        comments: comments,
      });

      for (let co of arrayColl) {
        if (co._id.toString() === collectId.toString()) {
          co = newPlace;
        }
      }
      user.collections = arrayColl;
      return user.save();
    })
    .then((result) => {
      return res.render("showcollection.ejs", {
        pageTitle: "My Collections",
        collects: result.collections,
        userId: result._id,
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postViewPlaces = (req, res, next) => {
  const { collectId } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }
      const arrayColl = user.collections;
      let arrayPlaces = [];
      for (let colls of arrayColl) {
        if (colls._id.toString() === collectId.toString()) {
          arrayPlaces = colls.places;
        }
      }
      return arrayPlaces;
    })
    .then((places) => {
      return res.render("showplaces.ejs", {
        pageTitle: "Places",
        places: places,
        userId: userId,
        collectId: collectId,
        isAuthenticated: true,
        mapsApiKey: process.env.MAPS_API_KEY,
        mapsApiKeyTwo: process.env.MAPS_API_KEY_2,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCollection = (req, res, next) => {
  const { collectId } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }

      user.collections.pull({ _id: collectId });
      user.save();
      return res.render("showcollection.ejs", {
        pageTitle: "My Collections",
        collects: user.collections,
        userId: user._id,
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeletePlace = (req, res, next) => {
  const { collectId, placeId } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }
      let collects = user.collections;
      let theCollect = [];
      for (let coll of collects) {
        if (coll._id.toString() === collectId.toString()) {
          coll.places.pull({ _id: placeId });
          theCollect = coll.places;
        }
      }
      user.collections = collects;
      user.save();

      return res.render("showplaces.ejs", {
        pageTitle: "Places",
        places: theCollect,
        userId: userId,
        collectId: collectId,
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditPlace = async (req, res, next) => {
  const { collectId, placeId } = req.body;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }
      const collects = user.collections;
      let myPlaces = [];
      for (let coll of collects) {
        if (coll._id.toString() === collectId.toString()) {
          myPlaces = coll.places;
        }
      }

      let result = {};
      for (let mp of myPlaces) {
        if (mp._id.toString() === placeId.toString()) {
          result = mp;
        }
      }
      return res.render("addplace.ejs", {
        pageTitle: "Edit Place",
        collectId: collectId,
        userId: userId,
        placeId: placeId,
        isAuthenticated: true,
        editPlace: result,
        editMode: true,
        errorMessage: null,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditSavePlace = async (req, res, next) => {
  const { collectId, placeId, name, direction, comments } = req.body;
  const userId = req.user._id;

  const errors = validationResult(req);
  const errorEdit = {
    name,
    direction,
    comments,
  };
  if (!errors.isEmpty()) {
    return res.status(422).render("addplace.ejs", {
      pageTitle: "Save Place",
      collectId: collectId,
      userId: userId,
      placeId: placeId,
      isAuthenticated: true,
      editPlace: errorEdit,
      editMode: true,
      errorMessage: errors.array()[0].msg,
    });
  }

  const coordinates = await client.geocode({
    params: {
      address: direction,
      key: process.env.MAPS_API_KEY,
    },
  });

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect(`/usermenu`);
      }
      let colls = user.collections;
      let places = [];
      for (let co of colls) {
        if (co._id.toString() === collectId.toString()) {
          for (let edtPlc of co.places) {
            if (edtPlc._id.toString() === placeId.toString()) {
              edtPlc.name = name;
              edtPlc.direction = direction;
              edtPlc.latitude =
                coordinates.data.results[0].geometry.location.lat;
              edtPlc.length = coordinates.data.results[0].geometry.location.lng;
              edtPlc.comments = comments;
            }
          }
          places = co.places;
        }
      }
      user.save();
      return res.render("showplaces.ejs", {
        pageTitle: "Places",
        places: places,
        userId: userId,
        collectId: collectId,
        mapsApiKeyTwo: process.env.MAPS_API_KEY_2,
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};
