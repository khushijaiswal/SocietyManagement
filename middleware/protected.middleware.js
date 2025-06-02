const jwt = require('jsonwebtoken');
const Resident = require('../models/Resident');
const Security = require('../models/Security');
// const Admin = require('../models/Admin');



exports.adminprotected = (req, res, next) => {
    const admin = req.cookies.admin

    if (!admin) {
        return res.status(401).json({ message: "no cookie found" })
        // socket.emit("no cookie found")
    }

    jwt.verify(admin, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
            // socket.emit("no cookie found")
        }
        req.adminId = decode.id
        next()
    })

}


exports.residentProtected = async (req, res, next) => {
    const resident = req.cookies.resident
    // console.log(req.cookies)
    if (!resident) {
        return res.status(401).json({ message: "no cookie found" })
    }

    jwt.verify(resident, process.env.JWT_SECRET, async (err, decode) => {  //decode mein wahi data ata jo humne auth.controller se bheja
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }

        const result = await Resident.findById(decode.id)
        if (!result) {
            // console.log("id", decode._id)
            return res.status(401).json({ message: "invalid resident id" })
        }
        if (!result.isActive) {
            return res.status(401).json({ message: "account block by admin" })
        }
        req.user = decode.id
        // console.log("loggedIn user", req.loggedInUser);

        next()
    })

}

exports.securityProtected = async (req, res, next) => {
    const security = req.cookies.security
    if (!security) {
        return res.status(401).json({ message: "no cookie found" })
    }

    jwt.verify(security, process.env.JWT_SECRET, async (err, decode) => {  //decode mein wahi data ata jo humne auth.controller se bheja
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }
        const result = await Security.findById(decode.id)
        if (!result) {
            // console.log("id", decode._id)
            return res.status(401).json({ message: "invalid security id" })
        }
        if (!result.isActive) {
            return res.status(401).json({ message: "account block by admin" })
        }

        req.security = decode.id
        next()
    })

}

