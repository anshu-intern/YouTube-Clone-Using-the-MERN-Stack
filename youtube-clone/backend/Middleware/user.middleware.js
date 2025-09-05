// Validate login inputs.
export function validateLoginInput(req, res, next){
    const { username, password } = req.body;

    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();

    if ( !trimmedUsername || !trimmedPassword  ){
        return res.status(400).json({ success : false , message : "username and password are required."});
    }

    req.body.username = trimmedUsername;
    req.body.password = trimmedPassword;

    next();
}

// Validate register inputs.
export function validateRegisterInput(req, res, next){
    const { username, email, password } = req.body;
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
        return res.status(400).json({ success : false , message : "Username, email and password are required."});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ success : false , message : "Invalid email format."});
    }

    if (trimmedPassword.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    req.body.username = trimmedUsername;
    req.body.email = trimmedEmail;
    req.body.password = trimmedPassword;

    next();
}