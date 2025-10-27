# AI 交易系统设计文档

## 1. 项目概述

### 1.1 项目简介
Nof2 是一个基于大语言模型（LLM）的智能加密货币交易系统，通过 DeepSeek 模型分析市场价格行为和技术指标（MACD、RSI、Volume），自动执行现金交易策略，为用户提供实时交易建议和自动化交易能力。

### 1.2 核心价值
- **智能决策**：利用 LLM 模型理解市场动态，提供基于深度学习的交易建议
- **自动化交易**：支持 OKX 交易所集成，实现自动化交易执行
- **实时监控**：提供实时收益曲线、持仓管理和交易记录追踪
- **可定制化**：支持提示词调整、交易参数配置和风险控制

### 1.3 技术栈
| 分类 | 技术选型 |
|------|---------|
| 前端框架 | Next.js 16.0.0 + React 19.2.0 |
| UI 框架 | Tailwind CSS + Shadcn UI |
| AI 集成 | Vercel AI SDK + DeepSeek Model |
| 数据库 | PostgreSQL + Prisma ORM |
| 交易所 | OKX API |
| 部署 | Docker + Docker Compose |

## 2. 系统架构

### 2.1 整体架构图

```mermaid
graph TB
    subgraph "客户端层"
        UI[Next.js Web UI]
    end
    
    subgraph "应用层"
        API[Next.js API Routes]
        WS[WebSocket Service]
    end
    
    subgraph "业务逻辑层"
        TS[Trading Strategy Engine]
        AM[AI Model Service]
        PM[Portfolio Manager]
        OM[Order Manager]
    end
    
    subgraph "数据层"
        DB[(PostgreSQL)]
        Cache[Redis Cache]
    end
    
    subgraph "外部服务"
        OKX[OKX Exchange API]
        DS[DeepSeek API]
    end
    
    UI --> API
    UI --> WS
    API --> TS
    API --> PM
    API --> OM
    TS --> AM
    AM --> DS
    OM --> OKX
    PM --> DB
    OM --> DB
    TS --> DB
    API --> Cache
    WS --> Cache
```

### 2.2 系统分层说明

| 层级 | 职责 | 主要组件 |
|------|------|---------|
| 客户端层 | 用户交互界面 | LIVE 页面、SETTING 页面、ABOUT 页面 |
| 应用层 | HTTP/WebSocket 服务 | API Routes、实时数据推送 |
| 业务逻辑层 | 核心交易逻辑 | 策略引擎、AI 分析、订单管理、持仓管理 |
| 数据层 | 数据持久化和缓存 | PostgreSQL、Redis |
| 外部服务 | 第三方集成 | OKX 交易所、DeepSeek 模型 |

## 3. 功能模块设计

### 3.1 页面架构

#### 3.1.1 主页（LIVE）布局结构

```mermaid
graph TD
    LIVE[LIVE Page]
    LIVE --> Header[Header 56px]
    LIVE --> Info[Info Bar 56px]
    LIVE --> Body[Body flex-1]
    
    Header --> HL[Logo Left]
    Header --> HM[Menu Center: LIVE/SETTING/ABOUT]
    Header --> HR[Theme Toggle Right]
    
    Info --> IL[Coin Prices Left]
    Info --> IR[Account Stats Right]
    
    Body --> BL[Revenue Chart Left]
    Body --> BR[Right Tabs]
    
    BR --> Tab1[Completed Trades]
    BR --> Tab2[Model Chat]
    BR --> Tab3[Positions]
```

#### 3.1.2 页面结构定义

**Header 模块**
| 区域 | 内容 | 功能说明 |
|------|------|---------|
| 左侧 | Logo | 品牌标识，点击返回主页 |
| 中间 | 导航菜单 | LIVE、SETTING、ABOUT 页面切换 |
| 右侧 | 主题切换器 | 日间/夜间模式切换 |

**Info Bar 模块**
| 区域 | 内容 | 数据来源 |
|------|------|---------|
| 左侧 | 币种实时价格 | OKX WebSocket 实时推送 |
| 右侧 | 账户收益率 + 余额 | 计算当前持仓盈亏 + OKX 账户查询 |

**Body 模块 - 左侧收益图表**
| 图表类型 | 折线图 |
|----------|---------|
| 纵坐标 | 百分比 / 金额（可切换） |
| 横坐标 | 时间范围（ALL / 72H 可选） |
| 数据更新 | 每 5 分钟更新一次（跟随交易周期） |

**Body 模块 - 右侧 Tab 面板**

| Tab 名称 | 功能描述 | 数据表结构 |
|----------|----------|------------|
| Completed Trades | 历史交易记录 | 价格、数量、时间、盈利 |
| Model Chat | AI 模型分析日志 | 时间戳、模型输出内容 |
| Positions | 当前持仓明细 | 币种、合约乘数、数量、成本、现价、利润 |

### 3.2 设置页面（SETTING）

#### 3.2.1 配置分组

```mermaid
graph LR
    Setting[Setting Page]
    Setting --> Model[Model Config]
    Setting --> Trade[Trading Config]
    Setting --> Account[Account Config]
    
    Model --> MP[Prompt Template]
    Model --> MM[Model Selection]
    
    Trade --> TP[Trading Period]
    Trade --> TC[Coins Selection]
    Trade --> TR[Risk Parameters]
    
    Account --> AK[API Keys]
    Account --> AL[Account Limits]
```

#### 3.2.2 配置参数表

**模型参数配置**
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| 模型提示词 | Text | 系统默认提示词 | 定义模型的分析策略和输出格式 |
| 模型选择 | Select | DeepSeek | 支持切换不同 LLM 模型 |
| 温度参数 | Slider | 0.7 | 控制模型输出的随机性 |

**交易参数配置**
| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| 交易周期 | Select | 5 分钟 | K 线周期，可选 1/5/15/30/60 分钟 |
| 交易币种 | Checkbox | BTC, ETH, SOL, BNB, DOGE, XRP | 多选币种 |
| 单笔交易上限 | Number | 1000 USDT | 单次交易最大金额 |
| 止损比例 | Percentage | 5% | 自动止损阈值 |
| 止盈比例 | Percentage | 10% | 自动止盈阈值 |

**账户参数配置**
| 参数名 | 类型 | 说明 |
|--------|------|------|
| OKX API Key | Password | OKX 交易所 API 密钥 |
| OKX Secret Key | Password | OKX 交易所密钥 |
| OKX Passphrase | Password | OKX API 口令 |

### 3.3 关于页面（ABOUT）

| 行为 | 跳转链接 |
|------|---------|
| 点击菜单 | 新窗口打开 https://github.com/leyen-me/nof2 |

## 4. 数据模型设计

### 4.1 数据库表结构

#### 4.1.1 用户配置表 (user_settings)
| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY | 唯一标识 |
| trading_period | INTEGER | NOT NULL | 交易周期（分钟） |
| selected_coins | TEXT[] | NOT NULL | 选中的币种列表 |
| model_prompt | TEXT | NOT NULL | 模型提示词 |
| model_name | VARCHAR(50) | NOT NULL | 模型名称 |
| max_trade_amount | DECIMAL | NOT NULL | 单笔最大交易额 |
| stop_loss_ratio | DECIMAL | NOT NULL | 止损比例 |
| stop_profit_ratio | DECIMAL | NOT NULL | 止盈比例 |
| okx_api_key | TEXT | ENCRYPTED | OKX API 密钥 |
| okx_secret_key | TEXT | ENCRYPTED | OKX 密钥 |
| okx_passphrase | TEXT | ENCRYPTED | OKX 口令 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 更新时间 |

#### 4.1.2 交易记录表 (trades)
| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY | 唯一标识 |
| coin_symbol | VARCHAR(20) | NOT NULL | 币种符号 |
| trade_type | ENUM | NOT NULL | 交易类型（BUY/SELL） |
| price | DECIMAL | NOT NULL | 成交价格 |
| quantity | DECIMAL | NOT NULL | 交易数量 |
| total_amount | DECIMAL | NOT NULL | 交易总额 |
| profit | DECIMAL | NULLABLE | 盈利金额 |
| profit_ratio | DECIMAL | NULLABLE | 盈利比例 |
| order_id | VARCHAR(100) | UNIQUE | OKX 订单 ID |
| status | ENUM | NOT NULL | 订单状态（PENDING/COMPLETED/FAILED） |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |
| completed_at | TIMESTAMP | NULLABLE | 完成时间 |

#### 4.1.3 持仓表 (positions)
| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY | 唯一标识 |
| coin_symbol | VARCHAR(20) | NOT NULL | 币种符号 |
| contract_multiplier | DECIMAL | NOT NULL | 合约乘数 |
| quantity | DECIMAL | NOT NULL | 持仓数量 |
| avg_cost | DECIMAL | NOT NULL | 平均成本 |
| current_price | DECIMAL | NOT NULL | 当前价格 |
| unrealized_profit | DECIMAL | NOT NULL | 未实现盈利 |
| unrealized_profit_ratio | DECIMAL | NOT NULL | 未实现盈利比例 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 更新时间 |

#### 4.1.4 AI 分析日志表 (ai_analysis_logs)
| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY | 唯一标识 |
| coin_symbol | VARCHAR(20) | NOT NULL | 分析币种 |
| analysis_content | TEXT | NOT NULL | 模型输出内容 |
| market_data | JSONB | NOT NULL | 市场数据快照 |
| decision | ENUM | NOT NULL | 决策结果（BUY/SELL/HOLD） |
| confidence | DECIMAL | NULLABLE | 决策置信度 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |

#### 4.1.5 收益记录表 (revenue_history)
| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | UUID | PRIMARY KEY | 唯一标识 |
| total_balance | DECIMAL | NOT NULL | 账户总余额 |
| total_profit | DECIMAL | NOT NULL | 累计盈利 |
| total_profit_ratio | DECIMAL | NOT NULL | 累计收益率 |
| snapshot_time | TIMESTAMP | NOT NULL | 快照时间 |

### 4.2 数据关系图

```mermaid
erDiagram
    user_settings ||--o{ trades : configures
    user_settings ||--o{ positions : manages
    user_settings ||--o{ ai_analysis_logs : generates
    trades ||--o| positions : affects
    ai_analysis_logs ||--o{ trades : triggers
    revenue_history ||--|| user_settings : tracks
    
    user_settings {
        uuid id PK
        integer trading_period
        text_array selected_coins
        text model_prompt
        varchar model_name
    }
    
    trades {
        uuid id PK
        varchar coin_symbol
        enum trade_type
        decimal price
        decimal quantity
        decimal profit
    }
    
    positions {
        uuid id PK
        varchar coin_symbol
        decimal quantity
        decimal avg_cost
        decimal unrealized_profit
    }
    
    ai_analysis_logs {
        uuid id PK
        varchar coin_symbol
        text analysis_content
        enum decision
    }
    
    revenue_history {
        uuid id PK
        decimal total_balance
        decimal total_profit_ratio
        timestamp snapshot_time
    }
```

## 5. 核心业务流程

### 5.1 交易决策流程

```mermaid
sequenceDiagram
    participant Scheduler as 定时任务
    participant Market as 市场数据服务
    participant AI as AI 分析引擎
    participant Risk as 风控模块
    participant Order as 订单执行器
    participant OKX as OKX 交易所
    participant DB as 数据库
    
    Scheduler->>Market: 每 5 分钟触发数据采集
    Market->>OKX: 获取 K 线数据（MACD/RSI/Volume）
    OKX-->>Market: 返回市场数据
    Market->>AI: 传递市场数据 + 用户提示词
    AI->>AI: 模型分析市场行为
    AI-->>AI: 生成交易建议（BUY/SELL/HOLD）
    AI->>DB: 保存分析日志
    AI->>Risk: 提交交易建议
    Risk->>Risk: 检查风控规则（仓位/止损/止盈）
    alt 通过风控
        Risk->>Order: 执行交易指令
        Order->>OKX: 下单请求
        OKX-->>Order: 返回订单结果
        Order->>DB: 保存交易记录
        Order->>DB: 更新持仓信息
    else 拒绝交易
        Risk->>DB: 记录拒绝原因
    end
```

### 5.2 数据流转说明

| 阶段 | 输入 | 处理逻辑 | 输出 |
|------|------|----------|------|
| 数据采集 | 币种列表、时间周期 | 调用 OKX API 获取 K 线、指标数据 | 结构化市场数据 |
| AI 分析 | 市场数据 + 提示词 | DeepSeek 模型推理，分析价格行为 | 交易建议 + 置信度 |
| 风控检查 | 交易建议 + 当前持仓 | 验证资金限额、止损止盈条件 | 通过/拒绝信号 |
| 订单执行 | 交易指令 | 调用 OKX 交易接口下单 | 订单状态 |
| 状态更新 | 订单结果 | 更新数据库持仓和交易记录 | 持久化存储 |

### 5.3 实时数据推送流程

```mermaid
sequenceDiagram
    participant Client as Web 客户端
    participant WS as WebSocket 服务
    participant Cache as Redis 缓存
    participant OKX as OKX WebSocket
    
    Client->>WS: 建立 WebSocket 连接
    WS->>OKX: 订阅币种价格频道
    loop 实时推送
        OKX->>WS: 推送价格更新
        WS->>Cache: 更新价格缓存
        WS->>Client: 推送最新价格
    end
    
    Client->>WS: 请求持仓更新
    WS->>Cache: 读取持仓数据
    Cache-->>WS: 返回持仓信息
    WS->>Client: 推送持仓变化
```

## 6. AI 模型集成

### 6.1 模型调用架构

```mermaid
graph LR
    Input[市场数据输入] --> Formatter[数据格式化器]
    Formatter --> Prompt[提示词模板引擎]
    Prompt --> SDK[Vercel AI SDK]
    SDK --> DeepSeek[DeepSeek API]
    DeepSeek --> Parser[响应解析器]
    Parser --> Decision[交易决策]
    Parser --> Log[分析日志]
```

### 6.2 提示词设计结构

**提示词模板组成**
| 部分 | 内容 | 作用 |
|------|------|------|
| 系统角色 | 定义模型为专业交易分析师 | 设定模型行为模式 |
| 分析目标 | 当前分析的币种和时间范围 | 明确分析对象 |
| 市场数据 | MACD、RSI、Volume、价格走势 | 提供决策依据 |
| 输出格式 | JSON 结构（decision/confidence/reason） | 规范化输出 |
| 约束条件 | 风险偏好、交易限制 | 控制决策边界 |

**示例提示词结构**
```
角色：你是一位经验丰富的加密货币量化交易分析师

任务：分析 [币种] 在 [时间周期] 的市场数据，给出交易建议

数据：
- 当前价格：[价格]
- MACD：[数值]
- RSI：[数值]
- 成交量变化：[百分比]

输出格式：
{
  "decision": "BUY/SELL/HOLD",
  "confidence": 0-100,
  "reason": "分析原因"
}

约束：
- 单笔交易不超过 [金额] USDT
- 避免在 RSI > 70 时买入
- 优先考虑风险控制
```

### 6.3 模型响应处理

| 响应字段 | 类型 | 处理逻辑 |
|----------|------|----------|
| decision | String | 映射为系统交易指令（BUY/SELL/HOLD） |
| confidence | Number | 低于 60 则不执行交易，记录为观望 |
| reason | String | 保存至 ai_analysis_logs 表，展示在 ModelChat Tab |

## 7. 外部服务集成

### 7.1 OKX 交易所集成

#### 7.1.1 API 调用清单

| API 类型 | 端点 | 用途 | 调用频率 |
|----------|------|------|----------|
| REST API | /api/v5/market/candles | 获取 K 线数据 | 每 5 分钟 |
| REST API | /api/v5/market/ticker | 获取实时价格 | 按需调用 |
| REST API | /api/v5/trade/order | 下单交易 | 按需调用 |
| REST API | /api/v5/account/balance | 查询账户余额 | 每 1 分钟 |
| WebSocket | /ws/v5/public | 订阅实时行情 | 持久连接 |

#### 7.1.2 数据处理流程

```mermaid
graph TD
    Request[发起 API 请求]
    Request --> Auth[签名认证]
    Auth --> Call[调用 OKX API]
    Call --> Validate[验证响应]
    Validate --> Success{成功?}
    Success -->|是| Parse[解析数据]
    Success -->|否| Retry[重试机制]
    Retry --> MaxRetry{达到最大重试?}
    MaxRetry -->|否| Call
    MaxRetry -->|是| Error[记录错误日志]
    Parse --> Cache[更新缓存]
    Cache --> Return[返回数据]
```

### 7.2 DeepSeek 模型集成

#### 7.2.1 集成方案

| 集成方式 | Vercel AI SDK |
|----------|---------------|
| API 端点 | DeepSeek Chat Completion API |
| 认证方式 | API Key（环境变量存储） |
| 流式响应 | 支持（用于实时展示分析过程） |
| 错误处理 | 自动重试 + 降级策略 |

#### 7.2.2 调用参数配置

| 参数名 | 默认值 | 说明 |
|--------|--------|------|
| model | deepseek-chat | 模型标识 |
| temperature | 0.7 | 控制输出随机性 |
| max_tokens | 1000 | 最大输出长度 |
| top_p | 0.9 | 核采样参数 |

## 8. UI 设计规范

### 8.1 设计系统

#### 8.1.1 色彩规范

| 用途 | 日间模式 | 夜间模式 |
|------|----------|----------|
| 背景色 | #FFFFFF | #0A0A0A |
| 主文本 | #1A1A1A | #E5E5E5 |
| 次要文本 | #666666 | #999999 |
| 边框 | #E5E5E5 | #2A2A2A |
| 涨幅 | #00C853 | #00C853 |
| 跌幅 | #FF3D00 | #FF3D00 |
| 强调色 | #000000 | #FFFFFF |

#### 8.1.2 排版规范

| 元素 | 字体 | 字号 | 字重 |
|------|------|------|------|
| 页面标题 | Geist | 24px | 600 |
| 模块标题 | Geist | 18px | 500 |
| 正文 | Geist | 14px | 400 |
| 辅助文本 | Geist Mono | 12px | 400 |
| 数字 | Geist Mono | 14px | 500 |

#### 8.1.3 布局规范

| 元素 | 尺寸 |
|------|------|
| Header 高度 | 56px |
| Info Bar 高度 | 56px |
| 组件间距 | 16px |
| 边距 | 24px |
| 圆角 | 0px（无圆角） |
| 边框宽度 | 1px |

### 8.2 组件设计

#### 8.2.1 图表组件

**收益曲线图**
| 属性 | 规范 |
|------|------|
| 图表类型 | 折线图（Line Chart） |
| 坐标轴 | X 轴：时间；Y 轴：百分比/金额切换 |
| 数据点 | 每 5 分钟一个数据点 |
| 趋势线 | 单色线条，涨跌用颜色区分 |
| 交互 | Hover 显示具体数值和时间 |

#### 8.2.2 表格组件

**交易记录表**
| 列名 | 宽度 | 对齐方式 | 格式化 |
|------|------|----------|--------|
| 时间 | 160px | 左对齐 | YYYY-MM-DD HH:mm:ss |
| 币种 | 80px | 左对齐 | 大写符号 |
| 类型 | 80px | 居中 | BUY/SELL 标签 |
| 价格 | 120px | 右对齐 | 保留 2 位小数 |
| 数量 | 120px | 右对齐 | 保留 4 位小数 |
| 盈利 | 120px | 右对齐 | 带颜色（红/绿） |

**持仓表**
| 列名 | 宽度 | 对齐方式 | 格式化 |
|------|------|----------|--------|
| 币种 | 100px | 左对齐 | 大写符号 |
| 合约乘数 | 100px | 居中 | 数字 |
| 数量 | 120px | 右对齐 | 保留 4 位小数 |
| 成本 | 120px | 右对齐 | 保留 2 位小数 |
| 现价 | 120px | 右对齐 | 保留 2 位小数 |
| 利润 | 120px | 右对齐 | 百分比 + 金额 |

#### 8.2.3 聊天组件

**Model Chat 展示**
| 元素 | 样式 |
|------|------|
| 消息容器 | 时间倒序排列 |
| 时间戳 | 灰色小字，每条消息上方 |
| 消息内容 | 左对齐，黑色文字 |
| 决策标签 | BUY（绿色）/SELL（红色）/HOLD（灰色） |
| 滚动行为 | 自动滚动到最新消息 |

### 8.3 响应式设计

| 断点 | 布局调整 |
|------|----------|
| < 768px | Header 菜单折叠；Body 上下布局；图表全宽 |
| 768px - 1024px | 保持左右布局，调整比例为 6:4 |
| > 1024px | 标准布局，左右比例 7:3 |

## 9. 环境配置与部署

### 9.1 环境变量清单

| 变量名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| DATABASE_URL | String | PostgreSQL 连接字符串 | postgresql://user:pass@localhost:5432/nof2 |
| REDIS_URL | String | Redis 连接字符串 | redis://localhost:6379 |
| DEEPSEEK_API_KEY | String | DeepSeek API 密钥 | sk-xxxxxxxxxxxxxxxx |
| OKX_API_KEY | String | OKX API Key | xxxxxxxx-xxxx-xxxx |
| OKX_SECRET_KEY | String | OKX Secret Key | xxxxxxxxxxxxxxxx |
| OKX_PASSPHRASE | String | OKX Passphrase | xxxxxxxx |
| NEXT_PUBLIC_WS_URL | String | WebSocket 服务地址 | ws://localhost:3000 |
| NODE_ENV | String | 运行环境 | development/production |

### 9.2 Docker 部署架构

```mermaid
graph TB
    subgraph "Docker Compose Services"
        Web[Next.js App Container]
        DB[PostgreSQL Container]
        Cache[Redis Container]
    end
    
    Web --> DB
    Web --> Cache
    
    Web -.->|Port 3000| Client[用户浏览器]
    DB -.->|Port 5432| Web
    Cache -.->|Port 6379| Web
```

### 9.3 Docker Compose 服务定义

| 服务名 | 镜像 | 端口映射 | 依赖 |
|--------|------|----------|------|
| web | node:20-alpine | 3000:3000 | db, redis |
| db | postgres:16 | 5432:5432 | - |
| redis | redis:7-alpine | 6379:6379 | - |

### 9.4 数据库初始化流程

```mermaid
sequenceDiagram
    participant App as Next.js App
    participant Prisma as Prisma CLI
    participant DB as PostgreSQL
    
    App->>Prisma: 启动时执行 prisma migrate deploy
    Prisma->>DB: 检查迁移状态
    DB-->>Prisma: 返回已应用的迁移
    Prisma->>DB: 应用新迁移脚本
    Prisma->>DB: 创建表结构
    Prisma->>DB: 插入初始数据（默认配置）
    DB-->>Prisma: 确认完成
    Prisma-->>App: 数据库就绪
```

## 10. 安全与风控

### 10.1 API 密钥管理

| 措施 | 实现方式 |
|------|----------|
| 存储加密 | 使用 AES-256 加密存储 OKX 密钥 |
| 环境隔离 | 开发/生产环境使用不同密钥 |
| 权限最小化 | OKX API 仅授予交易和查询权限 |
| 密钥轮换 | 提供密钥更新接口 |

### 10.2 风控规则

#### 10.2.1 交易前检查

| 规则名称 | 检查逻辑 | 拒绝条件 |
|----------|----------|----------|
| 资金充足性 | 账户余额 >= 交易金额 + 手续费 | 余额不足 |
| 单笔限额 | 交易金额 <= 用户设置的最大金额 | 超出限额 |
| 持仓集中度 | 单币种持仓 <= 总资金 50% | 持仓过度集中 |
| 市场波动 | 价格波动 > 10%/分钟 | 市场异常波动 |

#### 10.2.2 持仓管理

| 规则名称 | 触发条件 | 执行动作 |
|----------|----------|----------|
| 止损 | 亏损达到设定比例 | 自动平仓 |
| 止盈 | 盈利达到设定比例 | 自动平仓 |
| 强制平仓 | 账户权益 < 维持保证金 | 全部平仓 |

### 10.3 错误处理策略

```mermaid
graph TD
    Error[捕获异常]
    Error --> Type{异常类型}
    Type -->|网络错误| Retry[重试 3 次]
    Type -->|API 限流| Wait[等待后重试]
    Type -->|资金不足| Notify[通知用户]
    Type -->|系统错误| Log[记录日志]
    
    Retry --> Success{成功?}
    Success -->|是| Continue[继续执行]
    Success -->|否| Log
    
    Wait --> Retry
    Notify --> Log
    Log --> Alert[发送告警]
```

## 11. 性能优化策略

### 11.1 数据缓存机制

| 缓存类型 | 存储介质 | 过期时间 | 用途 |
|----------|----------|----------|------|
| 实时价格 | Redis | 5 秒 | 减少 OKX API 调用 |
| 市场数据 | Redis | 5 分钟 | 缓存 K 线数据 |
| 用户配置 | Redis | 1 小时 | 减少数据库查询 |
| 持仓数据 | Redis | 30 秒 | 加速页面加载 |

### 11.2 数据库优化

| 优化措施 | 实现方式 |
|----------|----------|
| 索引设计 | coin_symbol, created_at 字段创建索引 |
| 分页查询 | 交易记录和日志使用 Cursor 分页 |
| 连接池 | Prisma 连接池配置（min: 5, max: 20） |
| 定期清理 | 定时删除 90 天前的日志数据 |

### 11.3 前端性能优化

| 优化项 | 技术方案 |
|--------|----------|
| 组件懒加载 | Next.js Dynamic Import |
| 图表渲染 | 使用 Canvas 而非 SVG |
| 数据更新 | WebSocket 增量更新 |
| 状态管理 | 使用 Zustand 减少不必要渲染 |

## 12. 测试策略

### 12.1 单元测试覆盖

| 测试对象 | 测试工具 | 覆盖目标 |
|----------|----------|----------|
| API Routes | Jest | 请求参数验证、响应格式 |
| 数据模型 | Prisma Test | CRUD 操作正确性 |
| 工具函数 | Jest | 计算逻辑准确性 |
| 组件逻辑 | React Testing Library | 状态变化、事件处理 |

### 12.2 集成测试场景

| 场景 | 测试步骤 | 预期结果 |
|------|----------|----------|
| 完整交易流程 | 数据采集 → AI 分析 → 下单 → 更新持仓 | 订单成功，数据一致 |
| 风控拦截 | 触发止损条件 | 自动平仓，记录日志 |
| WebSocket 推送 | 价格变化 → 推送客户端 | 客户端收到实时数据 |

### 12.3 压力测试

| 测试项 | 测试参数 | 性能指标 |
|--------|----------|----------|
| API 并发 | 100 req/s | 响应时间 < 500ms |
| WebSocket 连接 | 50 并发连接 | 消息延迟 < 100ms |
| 数据库查询 | 1000 条记录查询 | 查询时间 < 200ms |
