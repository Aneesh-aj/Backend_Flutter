import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { isAuthenticate } from "../middlewares/auth";
import { userController } from "./injections/Injection";
import { validateSignup, validateOtpVerification, validateLogin } from "../middlewares/userInputValidation"
import { validationResult } from "express-validator"; 
import { redis } from "../config/redisConfig"
import axios from "axios";

export function UserRoute(router: Route) {

    // Signup route with validation
    router.post('/signup', validateSignup, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userController.signup(req, res, next);
    });

    // OTP verification and user creation route with validation
    router.post('/createUser', validateOtpVerification, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userController.otpVerificationAndUserCreation(req, res, next);
    });

    // Login route with validation
    router.post('/login', validateLogin, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        userController.userLogin(req, res, next);
    });

    // Logout route
    router.post('/logout', isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.logout(req, res, next);
    });

    // Get user profile route
    router.get('/profile', isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.getProfile(req, res, next); // Assuming getProfile method is in the controller
    });


    router.get('/weather', async (req: Req, res: Res, next: Next) => {
        const city = req.query.city ? req.query.city.toString() : "London";
        const cacheKey = `weather:${city.toLowerCase()}`;

        try {
            // Check if data is cached
            const cachedData = await redis.get(cacheKey);

            if (cachedData) {
                console.log("Serving from cache");
                return res.status(200).json(JSON.parse(cachedData));
            }

           
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: process.env.weatherApi, 
                    units: 'metric'
                }
            });
            
            const weatherData = response.data;

            await redis.set(cacheKey, JSON.stringify(weatherData), {
                ex: 600,
            });

            return res.status(200).json(weatherData);

        } catch (error:any) {
            console.log("Error fetching weather data:", error);
            return res.status(500).json({ message: "Failed to fetch weather data", error: error.message });
        }
    })

    return router;
}
