import mongoose from "mongoose";

const bonsaiSchema = mongoose.Schema({
    code: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: Object,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    chieuCao: {
        type: String,
        require: true
    },
    hoanhThan: {
        type: String,
        require: true
    },
    hoanhDe: {
        type: String,
        require: true
    },
});

const Bonsai = mongoose.model('bonsais', bonsaiSchema);
export default Bonsai;