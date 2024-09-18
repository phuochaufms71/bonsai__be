import mongoose from "mongoose";
import Order from "../models/orderModel.js"
import { handleResponseError, handleResponseSuccess } from "../utils/response.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        handleResponseSuccess(res, 200, "Get order successfully", { orders })
    } catch (error) {
        handleResponseError(res, 500, "Lỗi máy chủ")
        return
    }
}

export const createOrder = async (req, res) => {
    const { name, phoneNumber, email, address, bonsaiOrder } = req.body;
    const newOrder = await Order.create({ name, phoneNumber, email, address, bonsaiOrder});
    handleResponseSuccess(res, 201, "Tạo order thành công", { ...newOrder._doc})
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