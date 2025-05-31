import psycopg2
import psycopg2.extras
from config.settings import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME


class DatabaseManager:
    def __init__(self):
        self.connection = None

    def __enter__(self):
        self.connection = self.create_connection()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()

    def create_connection(self):
        if not self.connection or not self.connection.open:
            try:
                self.connection = psycopg2.connect(
                    host=DB_HOST,
                    user=DB_USER,
                    password=DB_PASSWORD,
                    database=DB_NAME,
                    cursor_factory=psycopg2.extras.RealDictCursor,  # 返回字典格式
                )
            except Exception as e:
                print(f"数据库连接错误：{e}")
        return self.connection

    def fetch_query(self, query, params=None, single=False):
        result = None
        if self.connection:
            try:
                with self.connection.cursor() as cursor:
                    cursor.execute(query, params)
                    if single:
                        result = cursor.fetchone()
                    else:
                        result = cursor.fetchall()
            except Exception as e:
                print(f"数据库查询错误：{e}")
        else:
            print("没有建立数据库连接")
            return None
        return result

    def execute_query(self, query, params=None):
        if self.connection:
            try:
                with self.connection.cursor() as cursor:
                    cursor.execute(query, params)
                    result = None
                    if "returning" in query.lower():
                        result = cursor.fetchone()
                    self.connection.commit()
                    return result if result else True
            except Exception as e:
                print(f"数据库执行错误：{e}")
                self.connection.rollback()
                return None
        else:
            print("没有建立数据库连接")
        return None

    def close_connection(self):
        if self.connection:
            self.connection.close()
