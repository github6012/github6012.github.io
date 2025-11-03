# QHSF-HSD 校园开发者社区管理系统 - API接口文档

## 文档信息

- **项目名称**: QHSF-HSD 校园开发者社区管理系统
- **文档版本**: v1.0
- **编写日期**: 2025年11月
- **API版本**: v1.0
- **审核状态**: 待审核

## 1. API概述

### 1.1 接口说明
本文档描述了QHSF-HSD校园开发者社区管理系统的所有API接口，包括前台展示接口和后台管理接口。系统采用RESTful API设计风格，支持JSON格式的数据交换。

### 1.2 基础信息
- **基础URL**: `http://localhost:5000` (开发环境)
- **协议**: HTTP/HTTPS
- **数据格式**: JSON
- **字符编码**: UTF-8
- **认证方式**: Session-based Authentication

### 1.3 通用响应格式

#### 1.3.1 成功响应
```json
{
    "code": 200,
    "message": "success",
    "data": {
        // 具体数据内容
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

#### 1.3.2 错误响应
```json
{
    "code": 400,
    "message": "错误描述",
    "error": "详细错误信息",
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 1.4 状态码说明
| 状态码 | 说明 | 描述 |
|--------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权访问 |
| 403 | Forbidden | 禁止访问 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器内部错误 |

## 2. 认证接口

### 2.1 管理员登录

#### 2.1.1 接口信息
- **URL**: `/admin/login`
- **方法**: `POST`
- **描述**: 管理员用户登录认证
- **认证**: 无需认证

#### 2.1.2 请求参数
```json
{
    "username": "admin",
    "password": "password123"
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| username | string | 是 | 用户名，长度3-80字符 |
| password | string | 是 | 密码，长度6-128字符 |

#### 2.1.3 响应示例
**成功响应**:
```json
{
    "code": 200,
    "message": "登录成功",
    "data": {
        "admin_id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "last_login": "2024-11-20T10:30:00Z"
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

**失败响应**:
```json
{
    "code": 401,
    "message": "用户名或密码错误",
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 2.2 管理员登出

#### 2.2.1 接口信息
- **URL**: `/admin/logout`
- **方法**: `POST`
- **描述**: 管理员用户登出
- **认证**: 需要登录

#### 2.2.2 响应示例
```json
{
    "code": 200,
    "message": "登出成功",
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 3. 前台展示接口

### 3.1 首页数据接口

#### 3.1.1 获取首页数据
- **URL**: `/api/home`
- **方法**: `GET`
- **描述**: 获取首页展示所需的所有数据
- **认证**: 无需认证

#### 3.1.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "featured_news": [
            {
                "id": 1,
                "title": "社区成立公告",
                "summary": "QHSF-HSD校园开发者社区正式成立",
                "image_url": "/static/images/news1.jpg",
                "published_at": "2024-11-20T10:00:00Z",
                "view_count": 156
            }
        ],
        "upcoming_events": [
            {
                "id": 1,
                "title": "Python编程工作坊",
                "location": "计算机学院A101",
                "event_start": "2024-11-25T14:00:00Z",
                "event_end": "2024-11-25T17:00:00Z",
                "current_participants": 15,
                "max_participants": 30
            }
        ],
        "recent_timeline": [
            {
                "id": 1,
                "title": "社区网站上线",
                "event_date": "2024-11-20",
                "event_type": "milestone",
                "importance": 5
            }
        ],
        "statistics": {
            "total_members": 128,
            "total_events": 15,
            "total_news": 32,
            "active_projects": 8
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.2 新闻接口

#### 3.2.1 获取新闻列表
- **URL**: `/api/news`
- **方法**: `GET`
- **描述**: 获取已发布的新闻列表
- **认证**: 无需认证

#### 3.2.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| per_page | int | 否 | 10 | 每页数量 |
| category | string | 否 | all | 新闻分类 |
| search | string | 否 | - | 搜索关键词 |

#### 3.2.3 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "news": [
            {
                "id": 1,
                "title": "社区成立公告",
                "summary": "QHSF-HSD校园开发者社区正式成立",
                "category": "announcement",
                "image_url": "/static/images/news1.jpg",
                "published_at": "2024-11-20T10:00:00Z",
                "view_count": 156,
                "is_featured": true
            }
        ],
        "pagination": {
            "page": 1,
            "per_page": 10,
            "total": 32,
            "pages": 4,
            "has_prev": false,
            "has_next": true
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

#### 3.2.4 获取新闻详情
- **URL**: `/api/news/{id}`
- **方法**: `GET`
- **描述**: 获取指定新闻的详细信息
- **认证**: 无需认证

#### 3.2.5 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "id": 1,
        "title": "社区成立公告",
        "content": "详细的新闻内容...",
        "summary": "QHSF-HSD校园开发者社区正式成立",
        "category": "announcement",
        "tags": "社区,公告,成立",
        "image_url": "/static/images/news1.jpg",
        "published_at": "2024-11-20T10:00:00Z",
        "view_count": 157,
        "is_featured": true,
        "author": {
            "id": 1,
            "username": "admin"
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.3 活动接口

#### 3.3.1 获取活动列表
- **URL**: `/api/events`
- **方法**: `GET`
- **描述**: 获取已发布的活动列表
- **认证**: 无需认证

#### 3.3.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| per_page | int | 否 | 10 | 每页数量 |
| category | string | 否 | all | 活动分类 |
| status | string | 否 | all | 活动状态(upcoming/ongoing/past) |

#### 3.3.3 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "events": [
            {
                "id": 1,
                "title": "Python编程工作坊",
                "description": "面向初学者的Python编程培训",
                "location": "计算机学院A101",
                "category": "workshop",
                "image_url": "/static/images/event1.jpg",
                "event_start": "2024-11-25T14:00:00Z",
                "event_end": "2024-11-25T17:00:00Z",
                "registration_start": "2024-11-20T00:00:00Z",
                "registration_end": "2024-11-24T23:59:59Z",
                "current_participants": 15,
                "max_participants": 30,
                "registration_fee": 0.00,
                "is_featured": true,
                "status": "upcoming"
            }
        ],
        "pagination": {
            "page": 1,
            "per_page": 10,
            "total": 15,
            "pages": 2,
            "has_prev": false,
            "has_next": true
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

#### 3.3.4 获取活动详情
- **URL**: `/api/events/{id}`
- **方法**: `GET`
- **描述**: 获取指定活动的详细信息
- **认证**: 无需认证

### 3.4 团队接口

#### 3.4.1 获取团队成员列表
- **URL**: `/api/team`
- **方法**: `GET`
- **描述**: 获取团队成员信息
- **认证**: 无需认证

#### 3.4.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "members": [
            {
                "id": 1,
                "name": "张三",
                "position": "技术负责人",
                "department": "技术部",
                "bio": "全栈开发工程师，专注于Web技术",
                "avatar_url": "/static/images/avatar1.jpg",
                "skills": "Python,JavaScript,React,Flask",
                "github_url": "https://github.com/zhangsan",
                "is_featured": true,
                "display_order": 1
            }
        ]
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.5 合作伙伴接口

#### 3.5.1 获取合作伙伴列表
- **URL**: `/api/partners`
- **方法**: `GET`
- **描述**: 获取合作伙伴信息
- **认证**: 无需认证

#### 3.5.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "partners": [
            {
                "id": 1,
                "name": "腾讯云",
                "description": "云计算服务提供商",
                "logo_url": "/static/images/partner1.png",
                "website_url": "https://cloud.tencent.com",
                "partnership_type": "technology",
                "partnership_level": "gold",
                "is_featured": true
            }
        ]
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.6 时间线接口

#### 3.6.1 获取时间线数据
- **URL**: `/api/timeline`
- **方法**: `GET`
- **描述**: 获取社区发展时间线
- **认证**: 无需认证

#### 3.6.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "timeline": [
            {
                "id": 1,
                "title": "社区网站上线",
                "description": "QHSF-HSD社区官方网站正式上线运行",
                "event_date": "2024-11-20",
                "event_type": "milestone",
                "importance": 5,
                "icon": "fas fa-rocket",
                "color": "#007bff"
            }
        ]
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.7 联系接口

#### 3.7.1 获取联系信息
- **URL**: `/api/contact`
- **方法**: `GET`
- **描述**: 获取社区联系方式
- **认证**: 无需认证

#### 3.7.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "organization_name": "QHSF-HSD校园开发者社区",
        "address": "某某大学计算机学院",
        "phone": "123-456-7890",
        "email": "contact@qhsf-hsd.com",
        "website": "https://qhsf-hsd.com",
        "qq_group": "123456789",
        "wechat_group": "QHSF-HSD",
        "github_org": "https://github.com/qhsf-hsd",
        "office_hours": "周一至周五 9:00-17:00"
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

#### 3.7.3 提交联系消息
- **URL**: `/api/contact/message`
- **方法**: `POST`
- **描述**: 提交联系消息或反馈
- **认证**: 无需认证

#### 3.7.4 请求参数
```json
{
    "sender_name": "李四",
    "sender_email": "lisi@example.com",
    "sender_phone": "138-0000-0000",
    "subject": "合作咨询",
    "message": "希望与贵社区建立合作关系...",
    "message_type": "collaboration"
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| sender_name | string | 是 | 发送者姓名，2-100字符 |
| sender_email | string | 是 | 发送者邮箱 |
| sender_phone | string | 否 | 发送者电话 |
| subject | string | 是 | 消息主题，3-200字符 |
| message | string | 是 | 消息内容，10字符以上 |
| message_type | string | 否 | 消息类型，默认为inquiry |

#### 3.7.5 响应示例
```json
{
    "code": 201,
    "message": "消息提交成功，我们会尽快回复您",
    "data": {
        "message_id": 123
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 3.8 学生申请接口

#### 3.8.1 提交加入申请
- **URL**: `/api/apply`
- **方法**: `POST`
- **描述**: 学生提交加入社区申请
- **认证**: 无需认证

#### 3.8.2 请求参数
```json
{
    "name": "王五",
    "student_id": "20240001",
    "major": "计算机科学与技术",
    "grade": "2024级",
    "phone": "138-0000-0001",
    "email": "wangwu@student.edu.cn",
    "qq": "123456789",
    "wechat": "wangwu2024",
    "skills": "Python, Java, Web开发",
    "experience": "参与过学校网站开发项目",
    "motivation": "希望在社区中学习更多技术，贡献自己的力量"
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| name | string | 是 | 姓名，2-100字符 |
| student_id | string | 是 | 学号，8-20字符 |
| major | string | 是 | 专业，2-100字符 |
| grade | string | 是 | 年级，2-20字符 |
| phone | string | 否 | 电话号码 |
| email | string | 否 | 邮箱地址 |
| qq | string | 否 | QQ号码 |
| wechat | string | 否 | 微信号 |
| skills | string | 否 | 技能描述 |
| experience | string | 否 | 经验描述 |
| motivation | string | 否 | 加入动机 |

#### 3.8.3 响应示例
```json
{
    "code": 201,
    "message": "申请提交成功，请等待审核",
    "data": {
        "application_id": 456,
        "status": "pending"
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 4. 后台管理接口

### 4.1 仪表板接口

#### 4.1.1 获取仪表板数据
- **URL**: `/admin/api/dashboard`
- **方法**: `GET`
- **描述**: 获取管理后台仪表板统计数据
- **认证**: 需要管理员登录

#### 4.1.2 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "statistics": {
            "total_news": 32,
            "published_news": 28,
            "total_events": 15,
            "upcoming_events": 5,
            "total_students": 128,
            "pending_applications": 8,
            "total_messages": 45,
            "unread_messages": 12
        },
        "recent_activities": [
            {
                "type": "student_application",
                "description": "新的学生申请：张三",
                "timestamp": "2024-11-20T09:30:00Z"
            },
            {
                "type": "contact_message",
                "description": "收到新的联系消息",
                "timestamp": "2024-11-20T08:45:00Z"
            }
        ],
        "charts_data": {
            "monthly_applications": [
                {"month": "2024-09", "count": 15},
                {"month": "2024-10", "count": 23},
                {"month": "2024-11", "count": 18}
            ],
            "news_by_category": [
                {"category": "announcement", "count": 8},
                {"category": "technology", "count": 12},
                {"category": "activity", "count": 10}
            ]
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

### 4.2 新闻管理接口

#### 4.2.1 获取新闻列表（管理）
- **URL**: `/admin/api/news`
- **方法**: `GET`
- **描述**: 获取所有新闻列表（包括未发布）
- **认证**: 需要管理员登录

#### 4.2.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| per_page | int | 否 | 20 | 每页数量 |
| status | string | 否 | all | 发布状态(all/published/draft) |
| category | string | 否 | all | 新闻分类 |
| search | string | 否 | - | 搜索关键词 |

#### 4.2.3 创建新闻
- **URL**: `/admin/api/news`
- **方法**: `POST`
- **描述**: 创建新的新闻文章
- **认证**: 需要管理员登录

#### 4.2.4 请求参数
```json
{
    "title": "新闻标题",
    "content": "新闻详细内容...",
    "summary": "新闻摘要",
    "category": "announcement",
    "tags": "标签1,标签2,标签3",
    "image_url": "/static/images/news.jpg",
    "is_published": true,
    "is_featured": false
}
```

#### 4.2.5 更新新闻
- **URL**: `/admin/api/news/{id}`
- **方法**: `PUT`
- **描述**: 更新指定新闻
- **认证**: 需要管理员登录

#### 4.2.6 删除新闻
- **URL**: `/admin/api/news/{id}`
- **方法**: `DELETE`
- **描述**: 删除指定新闻
- **认证**: 需要管理员登录

### 4.3 活动管理接口

#### 4.3.1 获取活动列表（管理）
- **URL**: `/admin/api/events`
- **方法**: `GET`
- **描述**: 获取所有活动列表
- **认证**: 需要管理员登录

#### 4.3.2 创建活动
- **URL**: `/admin/api/events`
- **方法**: `POST`
- **描述**: 创建新的活动
- **认证**: 需要管理员登录

#### 4.3.3 请求参数
```json
{
    "title": "活动标题",
    "description": "活动详细描述...",
    "location": "活动地点",
    "category": "workshop",
    "max_participants": 30,
    "registration_fee": 0.00,
    "image_url": "/static/images/event.jpg",
    "registration_start": "2024-11-20T00:00:00Z",
    "registration_end": "2024-11-24T23:59:59Z",
    "event_start": "2024-11-25T14:00:00Z",
    "event_end": "2024-11-25T17:00:00Z",
    "is_published": true,
    "is_featured": false
}
```

### 4.4 学生管理接口

#### 4.4.1 获取学生申请列表
- **URL**: `/admin/api/students`
- **方法**: `GET`
- **描述**: 获取学生申请列表
- **认证**: 需要管理员登录

#### 4.4.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| per_page | int | 否 | 20 | 每页数量 |
| status | string | 否 | all | 申请状态 |
| search | string | 否 | - | 搜索关键词 |

#### 4.4.3 审核学生申请
- **URL**: `/admin/api/students/{id}/review`
- **方法**: `POST`
- **描述**: 审核学生申请
- **认证**: 需要管理员登录

#### 4.4.4 请求参数
```json
{
    "action": "approve",
    "notes": "审核通过，欢迎加入社区"
}
```

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| action | string | 是 | 审核动作(approve/reject) |
| notes | string | 否 | 审核备注 |

#### 4.4.5 导出学生数据
- **URL**: `/admin/api/students/export`
- **方法**: `GET`
- **描述**: 导出学生数据为Excel文件
- **认证**: 需要管理员登录

### 4.5 团队管理接口

#### 4.5.1 获取团队成员列表（管理）
- **URL**: `/admin/api/team`
- **方法**: `GET`
- **描述**: 获取团队成员管理列表
- **认证**: 需要管理员登录

#### 4.5.2 添加团队成员
- **URL**: `/admin/api/team`
- **方法**: `POST`
- **描述**: 添加新的团队成员
- **认证**: 需要管理员登录

#### 4.5.3 请求参数
```json
{
    "name": "成员姓名",
    "position": "职位",
    "department": "部门",
    "bio": "个人简介",
    "avatar_url": "/static/images/avatar.jpg",
    "email": "member@example.com",
    "github_url": "https://github.com/member",
    "linkedin_url": "https://linkedin.com/in/member",
    "skills": "技能1,技能2,技能3",
    "join_date": "2024-11-20",
    "is_active": true,
    "is_featured": false,
    "display_order": 1
}
```

### 4.6 消息管理接口

#### 4.6.1 获取联系消息列表
- **URL**: `/admin/api/messages`
- **方法**: `GET`
- **描述**: 获取联系消息列表
- **认证**: 需要管理员登录

#### 4.6.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| per_page | int | 否 | 20 | 每页数量 |
| status | string | 否 | all | 消息状态 |
| type | string | 否 | all | 消息类型 |
| priority | string | 否 | all | 优先级 |

#### 4.6.3 回复消息
- **URL**: `/admin/api/messages/{id}/reply`
- **方法**: `POST`
- **描述**: 回复联系消息
- **认证**: 需要管理员登录

#### 4.6.4 请求参数
```json
{
    "reply_content": "感谢您的联系，我们会尽快处理您的请求...",
    "status": "resolved"
}
```

#### 4.6.5 更新消息状态
- **URL**: `/admin/api/messages/{id}/status`
- **方法**: `PATCH`
- **描述**: 更新消息处理状态
- **认证**: 需要管理员登录

### 4.7 文件上传接口

#### 4.7.1 上传图片
- **URL**: `/admin/api/upload/image`
- **方法**: `POST`
- **描述**: 上传图片文件
- **认证**: 需要管理员登录
- **Content-Type**: `multipart/form-data`

#### 4.7.2 请求参数
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| file | file | 是 | 图片文件(jpg/png/gif，最大5MB) |
| type | string | 否 | 图片类型(news/event/avatar/partner) |

#### 4.7.3 响应示例
```json
{
    "code": 200,
    "message": "上传成功",
    "data": {
        "filename": "20241120_103000_image.jpg",
        "url": "/static/uploads/20241120_103000_image.jpg",
        "size": 1024000,
        "type": "image/jpeg"
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 5. 数据统计接口

### 5.1 获取统计数据
- **URL**: `/admin/api/statistics`
- **方法**: `GET`
- **描述**: 获取系统统计数据
- **认证**: 需要管理员登录

### 5.2 请求参数
| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| type | string | 否 | overview | 统计类型(overview/news/events/students/messages) |
| period | string | 否 | month | 统计周期(day/week/month/year) |
| start_date | string | 否 | - | 开始日期(YYYY-MM-DD) |
| end_date | string | 否 | - | 结束日期(YYYY-MM-DD) |

### 5.3 响应示例
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "overview": {
            "total_news": 32,
            "total_events": 15,
            "total_students": 128,
            "total_messages": 45
        },
        "trends": {
            "news_trend": [
                {"date": "2024-11-01", "count": 3},
                {"date": "2024-11-02", "count": 2},
                {"date": "2024-11-03", "count": 1}
            ],
            "student_trend": [
                {"date": "2024-11-01", "count": 5},
                {"date": "2024-11-02", "count": 8},
                {"date": "2024-11-03", "count": 3}
            ]
        },
        "categories": {
            "news_by_category": [
                {"category": "announcement", "count": 8},
                {"category": "technology", "count": 12}
            ],
            "events_by_category": [
                {"category": "workshop", "count": 6},
                {"category": "seminar", "count": 4}
            ]
        }
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 6. 错误处理

### 6.1 错误码定义
| 错误码 | HTTP状态码 | 描述 | 解决方案 |
|--------|------------|------|----------|
| 1001 | 400 | 请求参数缺失 | 检查必填参数 |
| 1002 | 400 | 请求参数格式错误 | 检查参数格式 |
| 1003 | 400 | 请求参数值无效 | 检查参数值范围 |
| 2001 | 401 | 未登录 | 需要先登录 |
| 2002 | 401 | 登录已过期 | 重新登录 |
| 2003 | 403 | 权限不足 | 联系管理员 |
| 3001 | 404 | 资源不存在 | 检查资源ID |
| 4001 | 409 | 资源冲突 | 检查唯一性约束 |
| 5001 | 500 | 服务器内部错误 | 联系技术支持 |

### 6.2 错误响应示例
```json
{
    "code": 1001,
    "message": "缺少必填参数",
    "error": "参数 'title' 不能为空",
    "details": {
        "field": "title",
        "type": "required"
    },
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 7. 接口限流

### 7.1 限流规则
| 接口类型 | 限制 | 时间窗口 | 描述 |
|----------|------|----------|------|
| 公开接口 | 100次/IP | 1分钟 | 前台展示接口 |
| 登录接口 | 5次/IP | 1分钟 | 防止暴力破解 |
| 管理接口 | 200次/用户 | 1分钟 | 后台管理接口 |
| 上传接口 | 10次/用户 | 1分钟 | 文件上传接口 |

### 7.2 限流响应
```json
{
    "code": 429,
    "message": "请求过于频繁，请稍后再试",
    "retry_after": 60,
    "timestamp": "2024-11-20T10:30:00Z"
}
```

## 8. 接口版本控制

### 8.1 版本策略
- 当前版本：v1.0
- 版本格式：主版本.次版本.修订版本
- 向后兼容：保持至少两个主版本的兼容性

### 8.2 版本标识
- URL路径：`/api/v1/news`
- 请求头：`API-Version: 1.0`
- 查询参数：`?version=1.0`

## 9. 接口测试

### 9.1 测试环境
- **测试地址**: `http://localhost:5000`
- **测试账号**: admin / password123
- **测试工具**: Postman, curl, 浏览器开发者工具

### 9.2 测试用例示例

#### 9.2.1 登录测试
```bash
curl -X POST http://localhost:5000/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

#### 9.2.2 获取新闻列表测试
```bash
curl -X GET "http://localhost:5000/api/news?page=1&per_page=5" \
  -H "Accept: application/json"
```

#### 9.2.3 创建新闻测试
```bash
curl -X POST http://localhost:5000/admin/api/news \
  -H "Content-Type: application/json" \
  -H "Cookie: session=xxx" \
  -d '{
    "title": "测试新闻",
    "content": "这是一条测试新闻内容",
    "category": "general",
    "is_published": true
  }'
```

## 10. SDK和示例代码

### 10.1 JavaScript SDK示例
```javascript
// API客户端类
class QHSFAPIClient {
    constructor(baseURL = 'http://localhost:5000') {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        return response.json();
    }

    // 获取新闻列表
    async getNews(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/api/news?${query}`);
    }

    // 获取活动列表
    async getEvents(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/api/events?${query}`);
    }

    // 提交申请
    async submitApplication(data) {
        return this.request('/api/apply', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

// 使用示例
const api = new QHSFAPIClient();

// 获取新闻
api.getNews({ page: 1, per_page: 10 })
    .then(response => {
        console.log('新闻列表:', response.data.news);
    });

// 提交申请
api.submitApplication({
    name: '张三',
    student_id: '20240001',
    major: '计算机科学与技术',
    grade: '2024级'
}).then(response => {
    console.log('申请结果:', response.message);
});
```

### 10.2 Python SDK示例
```python
import requests
import json

class QHSFAPIClient:
    def __init__(self, base_url='http://localhost:5000'):
        self.base_url = base_url
        self.session = requests.Session()

    def request(self, endpoint, method='GET', data=None, params=None):
        url = f"{self.base_url}{endpoint}"
        response = self.session.request(
            method=method,
            url=url,
            json=data,
            params=params,
            headers={'Content-Type': 'application/json'}
        )
        return response.json()

    def get_news(self, **params):
        """获取新闻列表"""
        return self.request('/api/news', params=params)

    def get_events(self, **params):
        """获取活动列表"""
        return self.request('/api/events', params=params)

    def submit_application(self, data):
        """提交申请"""
        return self.request('/api/apply', method='POST', data=data)

    def admin_login(self, username, password):
        """管理员登录"""
        return self.request('/admin/login', method='POST', data={
            'username': username,
            'password': password
        })

# 使用示例
api = QHSFAPIClient()

# 获取新闻
news_response = api.get_news(page=1, per_page=10)
print("新闻列表:", news_response['data']['news'])

# 管理员登录
login_response = api.admin_login('admin', 'password123')
if login_response['code'] == 200:
    print("登录成功")
```

## 11. 更新日志

### 11.1 版本历史
| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2024-11-20 | 初始版本，包含所有基础接口 |

### 11.2 即将发布的功能
- 实时通知接口
- 文件批量上传
- 数据导入导出增强
- 第三方登录集成

## 12. 技术支持

### 12.1 联系方式
- **技术支持邮箱**: tech-support@qhsf-hsd.com
- **开发者文档**: https://docs.qhsf-hsd.com
- **GitHub仓库**: https://github.com/qhsf-hsd/community-system
- **问题反馈**: https://github.com/qhsf-hsd/community-system/issues

### 12.2 常见问题
1. **Q: 如何获取API访问权限？**
   A: 公开接口无需权限，管理接口需要先登录获取会话。

2. **Q: 接口返回401错误怎么办？**
   A: 检查是否已登录，会话是否过期，重新登录即可。

3. **Q: 如何处理文件上传？**
   A: 使用multipart/form-data格式，文件大小限制5MB。

4. **Q: 接口有请求频率限制吗？**
   A: 有，详见第7章接口限流部分。

---

**文档状态**: 初稿完成  
**审核状态**: 待审核  
**下次更新**: 根据API变更情况更新