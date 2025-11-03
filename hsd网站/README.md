# QHSF-HSD 校园开发者项目

## 项目简介

QHSF-HSD（青海师范大学-HSD）是一个面向全国高校学生的开发者社区平台。该项目旨在为高校学生提供技术交流、项目展示、活动参与的综合性平台，促进校园开发者之间的交流与合作。

## 技术栈

- **后端框架**: Flask (Python)
- **数据库**: SQLite + SQLAlchemy ORM
- **前端**: HTML5 + CSS3 + JavaScript + Bootstrap 5
- **图标库**: Bootstrap Icons
- **文件上传**: Werkzeug
- **数据导出**: openpyxl (Excel)
- **数据库迁移**: Flask-Migrate

## 项目结构

```
hsd网站/
├── app.py                 # 主应用文件
├── qhsf_hsd.db           # SQLite数据库文件
├── requirements.txt       # Python依赖包
├── README.md             # 项目说明文档
├── __pycache__/          # Python缓存目录
├── test_api.py           # API测试文件
├── static/              # 静态资源目录
│   ├── css/
│   │   └── style.css    # 主样式文件
│   ├── js/
│   │   └── main.js      # 主JavaScript文件
│   ├── images/          # 图片资源
│   └── uploads/         # 上传文件存储
└── templates/           # HTML模板目录
    ├── admin/           # 管理后台模板
    └── *.html          # 前台页面模板
```

## 核心文件说明

### app.py - 主应用文件

这是项目的核心文件，包含了所有的路由定义、数据模型和业务逻辑。

#### 数据模型 (Lines 1-100)
- **Admin**: 管理员模型，包含用户名、邮箱、密码哈希等字段
- **Event**: 活动模型，包含标题、描述、地点、时间、分类等字段
- **News**: 新闻模型，包含标题、内容、作者、发布时间、分类等字段
- **Student**: 学生模型，包含姓名、大学、专业、邮箱、个人简介等字段
- **Timeline**: 时间线模型，用于展示组织发展历程
- **Team**: 团队成员模型，包含成员信息和职位
- **Partner**: 合作伙伴模型，包含合作机构信息
- **ContactInfo**: 联系信息模型，存储组织联系方式
- **ContactMessage**: 联系消息模型，存储用户提交的联系表单

#### 主要路由功能

**用户认证路由 (Lines 101-200)**
- `index()`: 首页展示
- `user_login()`: 用户登录
- `user_logout()`: 用户登出
- `admin_login()`: 管理员登录
- `admin_logout()`: 管理员登出

**管理后台路由 (Lines 201-900)**
- `admin_dashboard()`: 管理后台首页
- `admin_events()`: 活动管理列表
- `admin_events_create()`: 创建活动
- `admin_events_edit()`: 编辑活动
- `admin_events_delete()`: 删除活动
- `admin_students()`: 学生管理（含搜索、筛选）
- `admin_applications()`: 学生申请审核
- `admin_students_approve()`: 批准学生申请
- `admin_students_reject()`: 拒绝学生申请
- `admin_students_group()`: 学生分组管理
- `admin_students_delete()`: 删除学生
- `admin_news()`: 新闻管理
- `admin_news_create()`: 创建新闻（含图片上传）
- `admin_news_edit()`: 编辑新闻
- `admin_timeline()`: 时间线管理
- `admin_team()`: 团队管理
- `admin_partners()`: 合作伙伴管理
- `admin_contact()`: 联系信息管理
- `admin_messages()`: 联系消息管理
- `admin_students_info()`: 学生信息详细管理
- `admin_students_export()`: 导出学生信息为Excel
- `admin_statistics()`: 数据统计分析

**前台展示路由 (Lines 901-1200)**
- `events()`: 活动展示页面
- `event_detail()`: 活动详情页面
- `news()`: 新闻展示页面
- `news_detail()`: 新闻详情页面
- `students()`: 学生展示页面
- `join()`: 加入我们页面
- `about()`: 关于我们页面

**API接口路由 (Lines 1200-1346)**
- `api_join()`: 处理加入申请API
- `api_events()`: 获取活动列表API
- `api_news()`: 获取新闻列表API
- `api_students()`: 获取学生列表API
- `api_stats()`: 获取统计数据API
- `api_subscribe()`: 处理新闻订阅API
- `api_contact()`: 处理联系表单API

### 模板文件说明

#### 前台模板
- **base.html**: 基础模板，包含公共头部、导航和脚部
- **index.html**: 首页模板，展示项目概览和最新动态
- **events.html**: 活动列表页面
- **news.html**: 新闻列表页面
- **students.html**: 学生展示页面
- **join.html**: 加入申请页面
- **about.html**: 关于我们页面
- **login.html**: 用户登录页面

#### 管理后台模板 (admin/)
- **login.html**: 管理员登录页面
- **dashboard.html**: 管理后台首页
- **sidebar.html**: 管理后台侧边栏组件
- **events.html**: 活动管理页面
- **events_form.html**: 活动创建/编辑表单
- **students.html**: 学生管理页面
- **students_info.html**: 学生信息详细管理
- **students_edit.html**: 学生信息编辑
- **applications.html**: 学生申请审核页面
- **news.html**: 新闻管理页面
- **news_form.html**: 新闻创建/编辑表单
- **timeline.html**: 时间线管理页面
- **timeline_form.html**: 时间线创建/编辑表单
- **team.html**: 团队管理页面
- **team_form.html**: 团队成员创建/编辑表单
- **partners.html**: 合作伙伴管理页面
- **partners_form.html**: 合作伙伴创建/编辑表单
- **contact.html**: 联系信息管理页面
- **contact_form.html**: 联系信息编辑表单
- **messages.html**: 联系消息管理页面
- **statistics.html**: 数据统计页面

### 静态资源文件

#### CSS样式 (static/css/)
- **style.css**: 主样式文件，包含全局样式、组件样式和响应式设计

#### JavaScript (static/js/)
- **main.js**: 主JavaScript文件，包含交互逻辑和AJAX请求处理

#### 图片资源 (static/images/)
- **logo.svg**: 项目Logo
- **avatar-default.svg**: 默认头像
- **event1.svg, event2.svg, event3.svg**: 示例活动图片
- **news1.svg, news2.svg**: 示例新闻图片

#### 上传目录 (static/uploads/)
- **news/**: 新闻图片上传存储目录

## 主要功能特性

### 1. 用户管理系统
- 管理员登录认证
- 学生注册申请
- 学生信息管理
- 申请审核流程

### 2. 内容管理系统
- 活动发布与管理
- 新闻发布与管理
- 图片上传功能
- 内容分类管理

### 3. 数据统计分析
- 基础数据统计
- 月度趋势分析
- 分类数据统计
- 数据可视化展示

### 4. 文件导出功能
- 学生信息Excel导出
- 自定义导出格式
- 数据完整性保证

### 5. API接口服务
- RESTful API设计
- JSON数据格式
- 分页查询支持
- 错误处理机制

### 6. 响应式设计
- 移动端适配
- Bootstrap框架
- 现代化UI设计
- 用户体验优化

## 安装与运行

### 环境要求
- Python 3.7+
- pip包管理器

### 安装步骤

1. 安装依赖包
```bash
pip install -r requirements.txt
```

2. 初始化数据库
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

3. 运行应用
```bash
python app.py
```

## 开发说明

### 数据库设计
项目使用SQLAlchemy ORM进行数据库操作，支持多种数据库后端。当前配置使用SQLite作为开发数据库，生产环境可切换至MySQL或PostgreSQL。

### 文件上传
支持图片文件上传功能，上传的文件存储在`static/uploads/`目录下，按模块分类存储。

### 安全性
- 密码使用Werkzeug进行哈希加密
- 管理后台需要登录认证
- 文件上传类型限制
- SQL注入防护

### 扩展性
项目采用模块化设计，便于功能扩展和维护。可以轻松添加新的数据模型、路由和页面模板。