from fastapi import FastAPI
from api.user import router as user_router
from api.blog import router as blog_router

app = FastAPI()

# 注册路由
app.include_router(user_router)
app.include_router(blog_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
