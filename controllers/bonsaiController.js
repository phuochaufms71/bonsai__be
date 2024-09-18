import mongoose from "mongoose";
import Bonsai from "../models/bonsaiModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";
import cloudinary from "../utils/cloudinary.js";

export const getBonsais = async (req, res) => {
    try {
        const bonsais = await Bonsai.find();
        handleResponseSuccess(res, 200, "Get bonsai successfully", { bonsais })
    } catch (error) {
        handleResponseError(res, 500, "Lỗi máy chủ")
        return
    }
}

export const getBonsaiDetail = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Id không đúng")
        return
    }
    const checkProductByIdInDb = await Bonsai.findById(id);
    if (!checkProductByIdInDb) {
        handleResponseError(res, 404, "Bonsai không tồn tại")
        return
    }
    handleResponseSuccess(res, 200, "Get bonsai successfully", {
        _id: checkProductByIdInDb._id,
        code: checkProductByIdInDb.code,
        category: checkProductByIdInDb.category,
        name: checkProductByIdInDb.name,
        image: checkProductByIdInDb.image,
        description: checkProductByIdInDb.description,
        price: checkProductByIdInDb.price,
        chieuCao: checkProductByIdInDb.chieuCao,
        hoanhThan: checkProductByIdInDb.hoanhThan,
        hoanhDe: checkProductByIdInDb.hoanhDe
    })
}

export const createBonsai = async (req, res) => {
    const { code, category, name, image, description, price, chieuCao, hoanhThan, hoanhDe } = req.body;

    if (!code || !category || !name || !description || !price || !chieuCao || !hoanhThan || !hoanhDe) {
        handleResponseError(res, 404, "Tất cả trường đều bắt buộc")
        return
    }

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: "bonsaiWeb"
        })

        if (uploadRes) {
            const newBonsai = await Bonsai.create({ code, category, name, image: uploadRes, description, price, chieuCao, hoanhThan, hoanhDe });
            handleResponseSuccess(res, 201, "Tạo bonsai mới thành công", { ...newBonsai._doc})
        }
    }
}

export const updateBonsai = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Id không đúng")
        return
    }
    const checkProductByIdInDb = await Bonsai.findById(id);
    if (!checkProductByIdInDb) {
        handleResponseError(res, 404, "Bonsai không tồn tại")
        return
    }
    const { code, category, name, image, description, price, chieuCao, hoanhThan, hoanhDe } = req.body;
    
    if (!code || !category || !name || !description || !price || !chieuCao || !hoanhThan || !hoanhDe) {
        handleResponseError(res, 404, "Tất cả trường đều bắt buộc")
        return
    }

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: "bonsaiWeb"
        })

        if (uploadRes) {
            await checkProductByIdInDb.updateOne({ code, category, name, image: uploadRes, description, price, chieuCao, hoanhThan, hoanhDe })
            const updateBonsai = await Bonsai.findById(id);
            handleResponseSuccess(res, 200, "Chỉnh sửa bonsai thành công", { ...updateBonsai._doc})
        }
    }
}

export const deleteBonsai = async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Id không tồn tại")
    return
  }
  const checkProductInDb = await Bonsai.findById(id)
  if (!checkProductInDb) {
    handleResponseError(res, 404, "Bonsai không tồn tại")
    return
  }
  await Bonsai.findByIdAndDelete(id)
  handleResponseSuccess(res, 200, "Xóa bonsai thành công")
}