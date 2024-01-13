"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getAll = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, occupation, gender, dateOfBirth, name }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
};
exports.default = { getAll, getNonSensitivePatients };
