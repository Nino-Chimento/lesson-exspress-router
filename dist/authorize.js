var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        console.log(user);
        if (!user || err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
});
export default authorize;
