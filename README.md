# 🌸 Perfume Collection API

> Backend API cho hệ thống quản lý nước hoa

---

## 📋 Yêu Cầu

- Node.js
- MongoDB (local hoặc Atlas)
- npm

---

## 🚀 Cài Đặt

### 1. Clone repo về máy

```bash
git clone <repo-url>
cd perfume-be
npm install
```

### 2. Tạo file `.env`

Tạo file `.env` ở thư mục gốc với nội dung:

```env
PORT=5000
MONGODB_URI=<connection_string_của_bạn>
JWT_SECRET=<đặt_gì_cũng_được>
GOOGLE_CLIENT_ID=<client_id_của_bạn>
```

**Ví dụ:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/perfume-db
JWT_SECRET=my_super_secret_key
GOOGLE_CLIENT_ID=946902322...fd0.apps.googleusercontent.com
```

### 3. Seed dữ liệu mẫu

```bash
node seed.js
```

> ⚠️ **Lưu ý:** Seed chỉ có mock data cho **Brand** và **Perfume**, không có data sẵn cho User.

### 4. Tạo tài khoản Admin

1. Tự tạo user thông qua API đăng ký
2. Mở MongoDB Compass
3. Tìm user vừa tạo và đổi `isAdmin = true`

> 💡 Đây là yêu cầu của đề bài

---

## ▶️ Chạy Server

```bash
npm start
```

Server sẽ chạy tại `http://localhost:5000`

---

## 📁 Cấu Trúc Thư Mục

```
perfume-be/
├── controllers/     # Xử lý logic
├── middleware/      # Auth middleware
├── models/          # Mongoose schemas
├── routes/          # API routes
├── seed.js          # Script seed data
└── server.js        # Entry point
```

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint    | Mô tả                       | Auth |
| ------ | ----------- | --------------------------- | ---- |
| `POST` | `/register` | Đăng ký tài khoản mới       | ❌   |
| `POST` | `/login`    | Đăng nhập, trả về JWT token | ❌   |

---

### 🌸 Perfumes (`/api/perfumes`)

| Method   | Endpoint        | Mô tả                                  | Auth     |
| -------- | --------------- | -------------------------------------- | -------- |
| `GET`    | `/`             | Lấy danh sách nước hoa (có pagination) | ❌       |
| `GET`    | `/:id`          | Lấy chi tiết một nước hoa              | ❌       |
| `POST`   | `/`             | Tạo nước hoa mới                       | 🛡️ Admin |
| `PUT`    | `/:id`          | Cập nhật nước hoa                      | 🛡️ Admin |
| `DELETE` | `/:id`          | Xóa nước hoa                           | 🛡️ Admin |
| `POST`   | `/:id/comments` | Thêm comment/review                    | 🔑 User  |

---

### 🏷️ Brands (`/api/brands`)

| Method   | Endpoint | Mô tả                     | Auth     |
| -------- | -------- | ------------------------- | -------- |
| `GET`    | `/`      | Lấy danh sách thương hiệu | 🛡️ Admin |
| `POST`   | `/`      | Tạo thương hiệu mới       | 🛡️ Admin |
| `PUT`    | `/:id`   | Cập nhật thương hiệu      | 🛡️ Admin |
| `DELETE` | `/:id`   | Xóa thương hiệu           | 🛡️ Admin |

---

### 👤 Members (`/api/members`)

| Method | Endpoint    | Mô tả                 | Auth    |
| ------ | ----------- | --------------------- | ------- |
| `GET`  | `/profile`  | Lấy thông tin profile | 🔑 User |
| `PUT`  | `/profile`  | Cập nhật profile      | 🔑 User |
| `PUT`  | `/password` | Đổi mật khẩu          | 🔑 User |

---

### 📊 Collectors/Dashboard (`/api/collectors`)

| Method | Endpoint | Mô tả                        | Auth     |
| ------ | -------- | ---------------------------- | -------- |
| `GET`  | `/`      | Lấy danh sách tất cả members | 🛡️ Admin |
| `GET`  | `/stats` | Lấy thống kê dashboard       | 🛡️ Admin |

---

### 🔑 Chú thích Auth

| Icon     | Ý nghĩa                     |
| -------- | --------------------------- |
| ❌       | Không cần đăng nhập         |
| 🔑 User  | Cần đăng nhập (JWT token)   |
| 🛡️ Admin | Cần đăng nhập + quyền Admin |

---

**Made with ☕ by KIETTTSE194431**
