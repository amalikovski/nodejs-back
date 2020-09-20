const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false, // quando false, essa informação não é retonarda na list de usuarios - fica oculta
    },
    passwordResetToken: {
        type: String,
        select: false, // quando false, essa informação não é retonarda na list de usuarios - fica oculta
    },
    passwordResetExpires: {
        type: Date,
        select: false, // quando false, essa informação não é retonarda na list de usuarios - fica oculta
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', function(next){
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;