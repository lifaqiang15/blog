from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone
from database.base_db import DatabaseManager

router = APIRouter(tags=["blog"])


# 创建博客
class CreateBlogRequest(BaseModel):
    title: str
    content: str
    status: str
    user_id: int
    category_id: int


@router.post("/blog")
def create_blog(blog_in: CreateBlogRequest):
    with DatabaseManager() as db:
        query = (
            "INSERT INTO blogs (title, content, status, user_id, category_id) VALUES (%s, %s, %s, %s, %s) RETURNING id"
        )
        params = (blog_in.title, blog_in.content, blog_in.status, blog_in.user_id, blog_in.category_id)
        result = db.execute_query(query, params)
        if result:
            return {"code": 200, "message": "博客创建成功", "data": result}
        else:
            return {"code": 500, "message": "博客创建失败"}


# 获取博客信息
@router.get("/blog/{id}")
def get_blog(id: int):
    with DatabaseManager() as db:
        query = "SELECT * FROM blogs WHERE id = %s"
        blog = db.fetch_query(query, (id,))
        if blog:
            return {"code": 200, "message": "博客获取成功", "data": blog}
        else:
            return {"code": 500, "message": "博客获取失败"}


# 更新博客信息
class UpdateBlogRequest(BaseModel):
    title: str
    content: str
    status: str
    published_time: str  # "2023-10-10T12:34:56+08:00"
    category_id: int


@router.put("/blog/info/{id}")
def update_blog(id: int, blog: UpdateBlogRequest):
    try:
        published_time = datetime.fromisoformat(blog.published_time).astimezone(timezone.utc)
    except Exception as e:
        print(e)
        return {"code": 400, "message": "published_time格式错误"}
    update_time = datetime.now(tz=timezone.utc)
    with DatabaseManager() as db:
        query = "UPDATE blogs SET title=%s, content=%s, status=%s, published_time=%s, update_time=%s, category_id=%s WHERE id=%s"
        params = (blog.title, blog.content, blog.status, published_time, update_time, blog.category_id, id)
        result = db.execute_query(query, params)
        if result:
            return {"code": 200, "message": "博客信息更新成功"}
        else:
            return {"code": 500, "message": "博客信息更新失败"}


# 更新博客浏览次数
@router.put("/blog/views/{id}")
def update_blog_views_count(id: int, views_count: int):
    with DatabaseManager() as db:
        query = "UPDATE blogs SET views_count=%s WHERE id=%s"
        params = (views_count, id)
        result = db.execute_query(query, params)
        if result:
            return {"code": 200, "message": "博客浏览次数更新成功"}
        else:
            return {"code": 500, "message": "博客浏览次数更新失败"}


# 删除博客
@router.delete("/blog/{id}")
def delete_blog(id: int):
    with DatabaseManager() as db:
        query = "DELETE FROM blogs WHERE id = %s"
        result = db.execute_query(query, (id,))
        if result:
            return {"code": 200, "message": "博客删除成功"}
        else:
            return {"code": 500, "message": "博客删除失败"}
