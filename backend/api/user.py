from fastapi import APIRouter
from pydantic import BaseModel
from passlib.hash import bcrypt
from database.base_db import DatabaseManager
from utils.auth import create_access_token

router = APIRouter(tags=["user"])


# 用户登录
class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(credentials: LoginRequest):
    with DatabaseManager() as db:
        query = "SELECT * FROM users WHERE username = %s"
        user = db.fetch_query(query, (credentials.username,), single=True)
        if not user:
            return {"code": 404, "message": "用户不存在"}
        if bcrypt.verify(credentials.password, user["password_hash"]):
            token = create_access_token({"sub": user["username"], "user_id": user["id"]})
            return {"code": 200, "message": "登陆成功", "data": user, "token": token}
        else:
            return {"code": 401, "message": "密码错误"}


# 添加用户
class UserCreateRequest(BaseModel):
    username: str
    password: str
    role: str
    avatar: str


@router.post("/user")
def create_user(user_in: UserCreateRequest):
    with DatabaseManager() as db:
        query = "SELECT * FROM users WHERE username = %s"
        user = db.fetch_query(query, (user_in.username,), single=True)
        if user:
            return {"code": 400, "message": "用户已存在"}
        else:
            query = "INSERT INTO users (username, password_hash, role, avatar) VALUES (%s, crypt(%s, gen_salt('bf'::text, 10)), %s, %s) RETURNING id"
            result = db.execute_query(query, (user_in.username, user_in.password, user_in.role, user_in.avatar))
            if result:
                return {"code": 200, "message": "用户创建成功", "data": result}
            else:
                return {"code": 500, "message": "用户创建失败"}


# 获取所有用户
@router.get("/user")
def get_users():
    with DatabaseManager() as db:
        query = "SELECT * FROM users"
        users = db.fetch_query(query)
        if users:
            return {"code": 200, "message": "用户列表获取成功", "data": users}
        else:
            return {"code": 500, "message": "用户列表获取失败"}


# 更新用户信息
class UserUpdateRequest(BaseModel):
    id: int
    username: str
    password: str
    role: str
    avatar: str


@router.put("/user")
def update_user(user: UserUpdateRequest):
    with DatabaseManager() as db:
        query = "UPDATE users SET username=%s, password_hash=crypt(%s, gen_salt('bf'::text, 10)), role=%s, avatar=%s WHERE id=%s"
        params = (user.username, user.password, user.role, user.avatar, user.id)
        result = db.execute_query(query, params)
        if result:
            return {"code": 200, "message": "用户信息更新成功"}
        else:
            return {"code": 500, "message": "用户信息更新失败"}


# 删除用户
@router.delete("/user")
def delete_user(id: int):
    with DatabaseManager() as db:
        query = "DELETE FROM users WHERE id = %s"
        result = db.execute_query(query, (id,))
        if result:
            return {"code": 200, "message": "用户删除成功"}
        else:
            return {"code": 500, "message": "用户删除失败"}
