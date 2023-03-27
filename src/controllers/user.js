const { validationResult } = require("express-validator");
const user = require("../models/user");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama = req.body.nama;
  const email = req.body.email;
  const password = req.body.password;
  // Cek apakah email sudah digunakan sebelumnya
  user
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Buat objek user baru
      const Upload = new user({
        nama,
        email,
        password,
      });

      // Simpan user ke database
      Upload.save()
        .then((result) => {
          res.status(201).json({
            message: "Create user Success",
            data: result,
          });
        })
        .catch((err) => console.log("error: ", err));
    })
    .catch((error) => {
      next(error);
    });
};

exports.userLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Cari pengguna dengan email yang diberikan
  user
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Email atau password salah" });
      }

      // Bandingkan password yang dimasukkan dengan password yang di-hash di database
      user
        .comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ message: "Email atau password salah" });
          }

          // Simpan data user ke session
          //   req.session.user = {
          //     id: user._id,
          //     name: user.name,
          //     email: user.email,
          //   };

          res.json({ message: "Login berhasil" });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};
