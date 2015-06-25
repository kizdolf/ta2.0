'use strict';

var mongoose			= require('mongoose'),
	Schema				= mongoose.Schema,
	statuts				= [0, 1, 2],
	bcrypt				= require('bcryptjs'),
	SALT_WORK_FACTOR	= 10;

var adminSchema	= new Schema({

	name:{
		type: String,
		required: true
	},
	password:{
		type: String
	},
	statut:{
		type: Number,
		enum: statuts,
		required: true
	},
	stats:{
		nbVisits: {
			type: Number,
			default : 0
		},
		lastVisit: Date
	},
	mail:{
		type: String,
		default: "mail@mail.ta"
	},
	token:{
		type: String,
		default: "token default"
	}
});

adminSchema.pre('save', function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password'))
		return next();
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err)
			return next(err);
		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err){
				return next(err);
			}
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err)
			return cb(err);
		cb(null, isMatch);
	});
};

//delete the password from the object, the hash will not be passed to the front(end.)
//Also insert the age into the response.
adminSchema.methods.toJSON = function() {
	var obj = this.toObject({ virtuals: true });
	delete obj.password;
	return obj;
};


module.exports		= mongoose.model('admin', adminSchema);
