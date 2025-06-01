from fastapi import APIRouter
from pydantic import BaseModel
from database.base_db import DatabaseManager

router = APIRouter(tags=["category"])


# 创建类别
class CreateCategoryRequest(BaseModel):
    name: str
    cover_image: str


@router.post("/category")
def create_category(req: CreateCategoryRequest):
    with DatabaseManager() as db:
        query = 'SELECT * FROM categories WHERE "name" = %s'
        category = db.fetch_query(query, (req.name,), single=True)
        if category:
            return {"code": 400, "message": "类别已存在"}
        else:
            query = "INSERT INTO categories (name, cover_image) VALUES (%s, %s) RETURNING id"
            params = (req.name, req.cover_image)
            result = db.execute_query(query, params)
            if result:
                return {"code": 200, "message": "类别添加成功", "data": result}
            else:
                return {"code": 500, "message": "类别添加失败"}


# 获取所有类别
@router.get("/category")
def get_categories():
    with DatabaseManager() as db:
        query = "SELECT * FROM categories"
        categories = db.fetch_query(query)
        if categories:
            return {"code": 200, "message": "类别列表获取成功", "data": categories}
        else:
            return {"code": 500, "message": "类别列表获取失败"}


# 更新类别信息
class UpdateCategoryRequest(BaseModel):
    id: int
    name: str
    cover_image: str


@router.put("/category")
def update_Category(req: UpdateCategoryRequest):
    with DatabaseManager() as db:
        query = "UPDATE categories SET name=%s, cover_image=%s WHERE id=%s"
        params = (req.name, req.cover_image, req.id)
        result = db.execute_query(query, params)
        if result:
            return {"code": 200, "message": "类别信息更新成功"}
        else:
            return {"code": 500, "message": "类别信息更新失败"}


# 删除类别
@router.delete("/category")
def delete_category(id: int):
    with DatabaseManager() as db:
        query = "DELETE FROM categories WHERE id = %s"
        result = db.execute_query(query, (id,))
        if result:
            return {"code": 200, "message": "类别删除成功"}
        else:
            return {"code": 500, "message": "类别删除失败"}
