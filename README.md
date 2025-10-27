# Nof2 - AI 交易系统

> 基于 DeepSeek 大语言模型的智能加密货币交易系统,实现自动化交易决策与执行

## 📋 项目概述

Nof2 是一个现代化的 AI 驱动交易平台,通过分析市场技术指标(MACD、RSI、Volume)和价格行为,利用大语言模型进行智能决策,自动执行加密货币交易策略。

### 核心特性

- 🤖 **AI 智能决策** - 基于 DeepSeek 模型的深度学习分析
- 📊 **实时监控** - WebSocket 实时价格推送和收益追踪
- 🔄 **自动化交易** - OKX 交易所集成,支持自动下单
- 🎨 **现代化 UI** - 简洁高级的设计系统,支持暗色模式
- 🛡️ **安全可靠** - API 密钥加密存储,完善的风控机制
- 📈 **数据可视化** - 实时收益曲线、交易记录、持仓管理

## 🏗️ 技术架构

### 技术栈

| 分类 | 技术 |
|------|------|
| 前端框架 | Next.js 16.0.0 + React 19.2.0 |
| UI 组件 | Tailwind CSS + Custom Design System |
| 状态管理 | Zustand |
| 数据可视化 | Recharts |
| 数据库 | PostgreSQL + Prisma ORM |
| 缓存 | Redis |
| AI 集成 | Vercel AI SDK + DeepSeek API |
| 交易所 | OKX API |
| 部署 | Docker + Docker Compose |

### 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                     客户端层                            │
│              Next.js Web Application                   │
└────────────┬────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────┐
│                   应用层                                │
│         API Routes + WebSocket Service                 │
└────┬────────────┬────────────┬───────────┬──────────────┘
     │            │            │           │
┌────▼────┐  ┌───▼────┐  ┌───▼────┐  ┌──▼──────┐
│ Trading │  │   AI   │  │Portfolio│  │ Order  │
│Strategy │  │ Model  │  │ Manager │  │Manager │
└────┬────┘  └───┬────┘  └───┬────┘  └──┬──────┘
     │            │            │           │
┌────▼────────────▼────────────▼───────────▼──────────┐
│              数据层                                  │
│         PostgreSQL + Redis Cache                   │
└────────────────────────────────────────────────────┘
     │                                    │
┌────▼────────┐                    ┌────▼────────┐
│  DeepSeek   │                    │     OKX     │
│     API     │                    │  Exchange   │
└─────────────┘                    └─────────────┘
```

## 🚀 快速开始

### 环境要求

- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (可选)

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/leyen-me/nof2.git
cd nof2
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env` 并填写配置:

```bash
cp .env.example .env
```

必填配置项:
- `DATABASE_URL` - PostgreSQL 数据库连接字符串
- `REDIS_URL` - Redis 连接字符串
- `DEEPSEEK_API_KEY` - DeepSeek API 密钥
- `ENCRYPTION_SECRET` - 32 位加密密钥

4. **初始化数据库**

```bash
npx prisma migrate dev
npx prisma generate
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### Docker 部署

使用 Docker Compose 一键部署完整环境:

```bash
docker-compose up -d
```

## 📚 功能模块

### 1. LIVE 页面

实时交易监控中心,包含:

- **收益曲线图表** - 可视化账户收益变化趋势
- **交易记录** - 历史交易明细和盈亏统计
- **模型分析日志** - AI 决策过程实时展示
- **持仓管理** - 当前持仓状态和未实现盈亏

### 2. SETTING 页面

系统配置中心:

- **模型参数** - 自定义提示词、模型选择、温度参数
- **交易参数** - 交易周期、币种选择、资金限额
- **风控设置** - 止损止盈比例配置
- **账户管理** - OKX API 密钥安全配置

### 3. 交易策略引擎

核心业务逻辑:

```
定时采集市场数据 → AI 模型分析 → 风控检查 → 执行交易 → 更新持仓
```

- **数据采集** - 每 5 分钟获取 K 线、MACD、RSI、Volume
- **AI 分析** - DeepSeek 模型基于市场数据生成交易建议
- **风控验证** - 检查资金充足性、仓位限制、止损止盈
- **订单执行** - 调用 OKX API 自动下单
- **状态同步** - 更新数据库和 WebSocket 推送

## 🗄️ 数据库设计

### 核心表结构

**用户配置表 (user_settings)**
- 交易参数配置
- 模型参数设置
- API 密钥加密存储

**交易记录表 (trades)**
- 交易类型、价格、数量
- 盈利计算
- 订单状态追踪

**持仓表 (positions)**
- 币种持仓数量
- 平均成本
- 未实现盈亏

**AI 分析日志表 (ai_analysis_logs)**
- 模型输出内容
- 市场数据快照
- 决策置信度

**收益历史表 (revenue_history)**
- 账户总余额
- 累计收益率
- 时间序列快照

详细 Schema 参见 `prisma/schema.prisma`

## 🔒 安全特性

### API 密钥保护

- AES-256 加密存储 OKX API 密钥
- 环境变量隔离敏感配置
- 密钥权限最小化原则

### 风控机制

| 规则 | 说明 |
|------|------|
| 资金充足性 | 交易前验证账户余额 |
| 单笔限额 | 限制单次交易最大金额 |
| 仓位集中度 | 单币种持仓不超过总资金 50% |
| 止损止盈 | 自动平仓保护 |
| 市场异常 | 价格剧烈波动暂停交易 |

## 📊 性能优化

### 缓存策略

| 数据类型 | 缓存时长 | 存储 |
|----------|----------|------|
| 实时价格 | 5 秒 | Redis |
| 市场数据 | 5 分钟 | Redis |
| 用户配置 | 1 小时 | Redis |
| 持仓数据 | 30 秒 | Redis |

### 数据库优化

- 索引优化 (coin_symbol, created_at)
- Cursor 分页查询
- 连接池配置 (min: 5, max: 20)
- 定期清理 90 天前日志

## 🛠️ 开发指南

### 项目结构

```
nof2/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── page.js            # 首页 (LIVE)
│   ├── setting/           # 设置页面
│   └── layout.js          # 根布局
├── components/            # React 组件
│   ├── header.js          # 顶部导航
│   ├── info-bar.js        # 信息栏
│   ├── live-page.js       # LIVE 页面
│   ├── revenue-chart.js   # 收益图表
│   └── ...                # 其他组件
├── lib/                   # 工具库
│   ├── prisma.js          # Prisma 客户端
│   ├── redis.js           # Redis 客户端
│   └── utils.js           # 通用工具函数
├── prisma/               # 数据库
│   └── schema.prisma     # 数据模型
├── docker-compose.yml    # Docker 编排
├── Dockerfile            # 容器配置
└── .env.example          # 环境变量模板
```

### 添加新功能

1. 创建 API Route: `app/api/[feature]/route.js`
2. 实现业务逻辑: `lib/services/[service].js`
3. 创建 UI 组件: `components/[component].js`
4. 更新数据模型 (如需): `prisma/schema.prisma`
5. 运行迁移: `npx prisma migrate dev`

## 🧪 测试

```bash
# 运行单元测试
npm test

# 运行集成测试
npm run test:integration

# 测试覆盖率
npm run test:coverage
```

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## ⚠️ 免责声明

本项目仅供学习和研究使用。加密货币交易存在高风险,使用本系统进行实际交易需自行承担风险。作者不对任何交易损失负责。

## 📧 联系方式

- GitHub: [@leyen-me](https://github.com/leyen-me)
- 项目地址: [https://github.com/leyen-me/nof2](https://github.com/leyen-me/nof2)

---

**⭐ 如果这个项目对你有帮助,请给个 Star 支持一下!**
