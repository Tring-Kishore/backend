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
const schema_1 = require("./schema");
const data_source_1 = __importDefault(require("./database/data-source"));
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const port = 4000;
data_source_1.default.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB Connected");
    const schema = yield (0, schema_1.createSchema)();
    const server = new server_1.ApolloServer({ schema });
    yield server.start();
    app.use('/graphql', (0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            var _b;
            const token = ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || '';
            try {
                const decoded = jsonwebtoken_1.default.verify(token, "Eoin Kishore");
                return { user: decoded };
            }
            catch (error) {
                return { user: null };
            }
        })
    }));
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/graphql`);
    });
}))
    .catch((error) => console.log(error));
