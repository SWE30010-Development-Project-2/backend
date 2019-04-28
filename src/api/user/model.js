import mongoose, {Schema} from 'mongoose'
import unique from 'mongoose-beautiful-unique-validation'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const model = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        seen: {
            type: Date
        },
    },
    {
        timestamps: true,
    }
);

model.path('email').set(function(email) {
    if(!this.avatar) {
        const hash = crypto.createHash('md5').update(email).digest('hex');
        this.avatar = `https://gravatar.com/avatar/${hash}?d=identicon`
    }

    return email
});

model.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 9).then((hash) => {
        this.password = hash;
        next()
    }).catch(next)
});

model.methods = {
    view (full) {
        const view = {
            id: this.id,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };

        return full ? {
            ...view,
            password: this.password
        } : view
    },
    authenticate (password) {
        return bcrypt.compare(password, this.password).then(valid => valid ? this : false)
    }
};

model.plugin(unique);

const user = mongoose.model('User', model);

export const schema = user.schema;
export default user;
