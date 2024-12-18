"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("./routes/user"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const userJob_1 = __importDefault(require("./routes/userJob"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', user_1.default);
// app.use('/admin', adminRouter);
app.use('/admin', admin_1.default);
app.use('/job', userJob_1.default);
const Mongo = process.env.MONGO_URL;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connected = yield mongoose_1.default.connect(Mongo || '');
            console.log("Connected to database");
        }
        catch (error) {
            console.log("Error connecting to database", error);
        }
    });
}
main();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
