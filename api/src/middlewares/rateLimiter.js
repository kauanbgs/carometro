const rateLimit = require("express-rate-limit");

// Brute force protection no login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15,
  message: {
    error: true,
    message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true // só conta tentativas com falha (status >= 400)
});

module.exports = { loginLimiter };