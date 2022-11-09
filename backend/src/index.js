const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User1 = require("./models/contact");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { validateToken } = require("./middlewares");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const { removeBackgroundFromImageFile } = require("remove.bg");
// const axios = require("axios");
// const FormData = require("form-data");
const API = require("./models/Api");
const Joi = require("joi");
const validationSchema = Joi.object({
  name: Joi.string().required().min(2),
  endPoint: Joi.string().uri().required().allow(""),
  description: Joi.string().required().min(3),
});

dotenv.config();

const app = express();



app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log("Error conneting to database" + err);
  });

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/contact", async (req, res) => {
  console.log(req.body);
  try {
    
    await User1.create({
      name: req.body.name,
      email: req.body.email, 
      phone: req.body.phone,
      message: req.body.message,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});


app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        _id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/bgremove", async (req, res) => {
  let sampleFile;
  let uploadPath;
  // console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath = __dirname + "\\public\\" + sampleFile.name;
  console.log(uploadPath);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    const localFile = uploadPath;
    const outputFile = __dirname + "\\public\\f" + sampleFile.name;

    removeBackgroundFromImageFile({
      path: localFile,
      apiKey: "4PP2znowi679dTKpNstBgdf2",
      size: "regular",
      type: "auto",
      scale: "50%",
      outputFile,
    })
      .then((result) => {
        console.log(`File saved to ${outputFile}`);
        const base64img = result.base64img;
        res.json({ base64img });
      })
      .catch((errors) => {
        console.log(JSON.stringify(errors));
      });
  });
});

//CRUD API

app.get("/api", (req, res) => {
  API.find()
    // .populate("postedBy", "_id name")
    .then((apis) => {
      res.json({ apis });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/api/myapi", validateToken, (req, res) => {
  console.log(req.user);
  API.find({ postedBy: req.user._id })
    // .populate("postedBy", "_id name")
    .then((myapi) => {
      console.log(myapi);
      res.json({ myapi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/api/myapi/:id", validateToken, (req, res) => {
  API.findById(req.params.id)
    .then((myapi) => {
      res.json({ myapi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.post("/api", validateToken, async (req, res) => {
  const { error } = validationSchema.validate(req.body);

  if (error) {
    return res.send({
      status: 400,
      message: error.details[0].message,
    });
  } else {
    const { name, endPoint, description } = req.body;
    if (!name || !endPoint || !description) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    console.log(req.user);
    req.user.password = undefined;
    const api = new API({
      name: name,
      endPoint: endPoint,
      description: description,
      postedBy: req.user,
    });

    try {
      const newAPI = await api.save();
      res.status(201).json({ newAPI, message: "API Added Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.put("/api/update/:id", validateToken, async (req, res) => {
  try {
    let api = await API.findOne({ _id: req.params.id });

    const { name, endPoint, description } = req.body;

    if (!name && !endPoint && !description) {
      return res.status(400).json({
        message: "Edit some data to update API",
      });
    }

    if (name) {
      api.name = name;
    }
    if (endPoint) {
      api.endPoint = endPoint;
    }
    if (description) {
      api.description = description;
    }

    await api.save();
    return res.status(200).json({
      message: "Update Successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/delete/:id", validateToken, (req, res) => {
  API.findByIdAndDelete(req.params.id)
    .then((api) => {
      if (api) {
        return res.status(404).send({ message: "API does not exist" });
      }
      res.send({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      return res.status(404).send({
        message: "API not found" + err,
      });
    });
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  });
}
app.listen(process.env.PORT, () => {
  console.log("Backend server has started at " + process.env.PORT);
});

