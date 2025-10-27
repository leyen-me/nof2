# Nof2 项目快速启动指南

## ✅ 已完成的功能

本项目已完成 **基础架构和前端界面** 的搭建,包括:

### 1. 完整的 UI 界面
- ✅ Header 导航栏 (Logo、菜单、主题切换)
- ✅ Info Bar 信息栏 (币种价格、账户统计)
- ✅ LIVE 页面 (收益图表、交易记录、AI 日志、持仓管理)
- ✅ SETTING 页面 (模型配置、交易配置、账户配置)
- ✅ 暗色/日间模式切换

### 2. 数据库设计
- ✅ Prisma Schema 完整定义
- ✅ 5 个核心数据表 (用户配置、交易记录、持仓、AI 日志、收益历史)

### 3. Docker 部署配置
- ✅ docker-compose.yml (PostgreSQL + Redis + Next.js)
- ✅ Dockerfile 多阶段构建

### 4. 项目文档
- ✅ README.md 完整项目说明
- ✅ IMPLEMENTATION.md 实施进度报告
- ✅ .env.example 环境变量模板

## 🚀 立即启动项目

### 方式一: 本地开发模式 (推荐用于开发)

```bash
# 1. 进入项目目录
cd /Users/apple/Desktop/project/nof2

# 2. 启动开发服务器
npm run dev
```

访问: http://localhost:3000

**当前状态**: 
- ✅ 可以查看完整的 UI 界面
- ✅ 可以切换主题 (暗色/日间模式)
- ✅ 可以浏览 LIVE 和 SETTING 页面
- ⚠️ 数据为模拟数据 (后端 API 尚未实现)

### 方式二: Docker 完整环境 (推荐用于测试)

```bash
# 1. 启动 PostgreSQL 和 Redis
docker-compose up -d postgres redis

# 2. 等待数据库启动完成 (约 10 秒)
sleep 10

# 3. 初始化数据库
npm run db:generate
npm run db:migrate

# 4. 启动开发服务器
npm run dev
```

### 方式三: 生产环境构建

```bash
# 1. 构建项目
npm run build

# 2. 启动生产服务器
npm start
```

## 📊 项目当前功能演示

### LIVE 页面功能
1. **收益曲线图表**
   - 切换视图: 百分比 (%) / 金额 ($)
   - 切换时间: 全部 (ALL) / 72 小时 (72H)
   - 实时折线图展示

2. **Completed Trades Tab**
   - 交易时间、币种、类型 (BUY/SELL)
   - 成交价格、交易数量
   - 盈亏金额和比例 (绿色/红色标识)

3. **Model Chat Tab**
   - AI 分析时间戳
   - 分析的币种
   - 决策标签 (BUY/SELL/HOLD)
   - 详细分析内容

4. **Positions Tab**
   - 持仓币种和数量
   - 平均成本 vs 当前价格
   - 未实现盈亏 (金额 + 百分比)

### SETTING 页面功能
1. **模型配置**
   - 提示词模板编辑
   - 模型选择 (DeepSeek Chat / Coder)
   - 温度参数调节 (0-1)

2. **交易配置**
   - 交易周期选择 (1/5/15/30/60 分钟)
   - 币种多选 (BTC/ETH/SOL/BNB/DOGE/XRP)
   - 单笔交易限额
   - 止损/止盈比例

3. **账户配置**
   - OKX API Key
   - OKX Secret Key
   - OKX Passphrase

## 🎨 UI 设计特点

- ✅ **极简风格**: 无圆角设计,简洁线条
- ✅ **现代化配色**: 黑白灰为主,涨跌用绿红标识
- ✅ **暗色模式**: 完美支持暗色/日间模式切换
- ✅ **响应式布局**: 适配不同屏幕尺寸
- ✅ **Mono 字体**: 数字和代码使用等宽字体
- ✅ **一致性**: 遵循统一的设计规范

## 🔧 可用的 NPM 命令

```bash
# 开发相关
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 数据库相关
npm run db:generate  # 生成 Prisma Client
npm run db:migrate   # 运行数据库迁移
npm run db:studio    # 打开 Prisma Studio (数据库可视化)
npm run db:push      # 推送 Schema 到数据库 (开发用)

# Docker 相关
npm run docker:up    # 启动所有 Docker 服务
npm run docker:down  # 停止所有 Docker 服务
npm run docker:logs  # 查看 Docker 日志
```

## 📁 项目文件结构

```
nof2/
├── app/                       # Next.js App Router
│   ├── api/                  # API Routes (待实现)
│   ├── setting/              # 设置页面
│   │   └── page.js
│   ├── page.js               # 首页 (LIVE)
│   ├── layout.js             # 根布局
│   └── globals.css           # 全局样式
├── components/               # React 组件
│   ├── header.js             # ✅ Header 导航
│   ├── info-bar.js           # ✅ Info Bar
│   ├── theme-provider.js     # ✅ 主题管理
│   ├── live-page.js          # ✅ LIVE 页面
│   ├── revenue-chart.js      # ✅ 收益图表
│   ├── completed-trades.js   # ✅ 交易记录
│   ├── model-chat.js         # ✅ AI 日志
│   ├── positions.js          # ✅ 持仓管理
│   └── setting-page.js       # ✅ 设置页面
├── lib/                      # 工具库
│   ├── prisma.js             # ✅ Prisma 客户端
│   └── utils.js              # ✅ 工具函数
├── prisma/
│   └── schema.prisma         # ✅ 数据库 Schema
├── docker-compose.yml        # ✅ Docker 编排
├── Dockerfile                # ✅ Docker 镜像
├── .env.example              # ✅ 环境变量模板
├── README.md                 # ✅ 项目文档
├── IMPLEMENTATION.md         # ✅ 实施进度
└── QUICKSTART.md             # ✅ 本文件
```

## ⚠️ 重要提示

### 当前限制
1. **模拟数据**: 所有前端展示数据均为模拟数据
2. **无 API 后端**: 后端 API Routes 尚未实现
3. **无实时功能**: WebSocket 实时推送尚未实现
4. **无交易功能**: OKX 交易所集成尚未实现
5. **无 AI 功能**: DeepSeek 模型集成尚未实现

### 下一步开发
详见 `IMPLEMENTATION.md` 文件中的 "待实现的核心功能" 章节

## 💡 开发技巧

### 1. 实时预览修改
开发服务器支持热重载,修改文件后自动刷新浏览器

### 2. 查看数据库
```bash
npm run db:studio
```
访问: http://localhost:5555

### 3. 修改样式
全局样式: `app/globals.css`
组件样式: 使用 Tailwind CSS 类名 + CSS 变量

### 4. 调试技巧
- 打开浏览器控制台查看组件状态
- 使用 React DevTools 调试组件树
- 查看网络请求 (虽然当前无 API)

## 🎯 体验项目

1. **启动项目**
   ```bash
   npm run dev
   ```

2. **打开浏览器**: http://localhost:3000

3. **尝试功能**:
   - 点击右上角图标切换主题
   - 点击导航菜单切换页面
   - 在 LIVE 页面切换不同 Tab
   - 在收益图表切换视图和时间范围
   - 在 SETTING 页面修改配置 (虽然不会保存)
   - 点击 ABOUT 跳转到 GitHub (会报 404)

4. **观察界面**:
   - 注意设计细节 (无圆角、线条、间距)
   - 查看颜色系统 (黑白灰 + 涨跌色)
   - 体验暗色模式切换效果
   - 测试响应式布局 (缩放浏览器窗口)

## 📞 问题反馈

如有问题,请查看:
1. `README.md` - 项目整体说明
2. `IMPLEMENTATION.md` - 实施进度和待办事项
3. `.env.example` - 环境变量配置说明

---

**项目状态**: MVP 基础框架已完成 (~35%)
**最后更新**: 2025-10-27
**版本**: 0.1.0
