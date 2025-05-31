from fastapi import APIRouter
from pydantic import BaseModel
from database.base_db import DatabaseManager

router = APIRouter(tags=["user"])


class BlogCreateRequest(BaseModel):
    title: str
    content: str
    user_id: str
    category_id: str


@router.post("/blog")
def create_blog(blog_in: BlogCreateRequest):
    with DatabaseManager() as db:
        query = "INSERT INTO blog (title, content, user_id, category_id) VALUES (%s, %s, %s, %s)"
        params = (blog_in.title, blog_in.content, blog_in.user_id, blog_in.category_id)
        db.execute_query(query, params)
    return {"code": 200, "message": "博客创建成功"}


@router.get("/blog")
def get_blog(user_id: int, title: str, content: str, status: str):
    pass


@router.put("/blog")
def update_blog(user_id: int, title: str, content: str, status: str):
    pass


@router.delete("/blog")
def delete_blog(user_id: int, title: str, content: str, status: str):
    pass
