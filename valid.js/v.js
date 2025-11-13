const sanitizeInput = (value) => {
    if (typeof value !== 'string') return '';
    return value.trim().replace(/'/g, "''").toLowerCase();  
}; 

const isValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}; 

const isStrongPassword = (password) => {
    if (!password) return false;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passRegex.test(password);
};

const validateRequired = (fields, requireKeys) => {
    for (const key of requireKeys) {
        if (!fields[key] || !String(fields[key]).trim()) {
            return `${key} is required.`;
        }
    }
    return null; // no errors 
};

const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    if (!isValidateEmail(email)) return 'Invalid email format';
    return null; 
};

const validatePassword = (password) => {
    if (!password) return 'Password is required.';
    if (!isStrongPassword(password)) {
        return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
    }
    return null; 
};

const validateSignup = (req, res, next) => {
    let { name, email, password } = req.body;

    name= sanitizeInput(name);
    email = sanitizeInput(email);
    password = sanitizeInput(password);

    const requiredError = validateRequired({ name, email, password }, ['name', 'email', 'password']);
    if (requiredError) return res.status(400).json({ error : requiredError});

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ error : emailError});

    const passwordError = validatePassword(password);
    if (passwordError) return res.status(400).json({ error : passwordError});

    req.body = { name, emaIL, password, role: 'user' };
    next();
};

const validateLogin = (req, res, next) => {
    let {email, password } = req.body;
    email = sanitizeInput(email);

    const requiredError = validateRequired({ email, password }, ['email', 'password']);
    if (requiredError) return res.status(400).json({ error : requiredError});

    const emailError = validateEmail(email);
    if (emailError) return res.status(400).json({ error : emailError});

    validdateLogin = (req, res, next) => {
    req.body.email =email;
    next();
    };

    const validatUserUpdate = (req, res, next) => {
        const updates = {};

        if (req.body.email) updates.name = sanitizeInput(req.body.name);

        if (req.body.email) {
            updates.email = sanitizeInput(req.body.email);
            const emailError = validateEmail(updates.email);
            if (emailError) return res.status(400).json({ error : emailError});
        }
        if (req.body.password) {
            const passError = validatePassword(req.body.password);
            if (passError) return res.status(400).json({ error : passError});
        }
        req.body = {...req.body, ...updates };
        next();
    };
module.exports = {
    validateSignup,
    validateLogin,
    validatUserUpdate,
};


        } 

        {
}