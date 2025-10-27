/**
 * 环境变量配置验证工具
 */

/**
 * 必需的环境变量列表
 */
const REQUIRED_ENV_VARS = {
  DATABASE_URL: {
    required: true,
    description: 'PostgreSQL database connection URL',
  },
  ENCRYPTION_SECRET: {
    required: true,
    description: '32-character encryption secret key',
    validate: (value) => value && value.length >= 32,
  },
}

/**
 * 可选的环境变量列表
 */
const OPTIONAL_ENV_VARS = {
  REDIS_URL: {
    required: false,
    description: 'Redis connection URL',
    default: 'redis://localhost:6379',
  },
  DEEPSEEK_API_KEY: {
    required: false,
    description: 'DeepSeek API key for AI analysis',
  },
  NEXT_PUBLIC_WS_URL: {
    required: false,
    description: 'WebSocket server URL',
    default: 'ws://localhost:3000',
  },
  NODE_ENV: {
    required: false,
    description: 'Node environment',
    default: 'development',
  },
}

/**
 * 验证环境变量配置
 * @throws {Error} 如果缺少必需的环境变量
 */
export function validateEnv() {
  const errors = []
  const warnings = []

  // 检查必需的环境变量
  for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key]
    
    if (!value) {
      errors.push(`Missing required environment variable: ${key} - ${config.description}`)
    } else if (config.validate && !config.validate(value)) {
      errors.push(`Invalid value for ${key} - ${config.description}`)
    }
  }

  // 检查可选的环境变量
  for (const [key, config] of Object.entries(OPTIONAL_ENV_VARS)) {
    const value = process.env[key]
    
    if (!value && config.default) {
      warnings.push(`Using default value for ${key}: ${config.default}`)
      process.env[key] = config.default
    } else if (!value) {
      warnings.push(`Optional environment variable not set: ${key} - ${config.description}`)
    }
  }

  // 如果有错误，抛出异常
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
  }

  // 输出警告
  if (warnings.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn('Environment warnings:')
    warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  return true
}

/**
 * 获取环境变量值
 * @param {string} key - 环境变量键
 * @param {string} defaultValue - 默认值
 * @returns {string} 环境变量值
 */
export function getEnv(key, defaultValue = '') {
  return process.env[key] || defaultValue
}

/**
 * 检查是否为开发环境
 * @returns {boolean}
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

/**
 * 检查是否为生产环境
 * @returns {boolean}
 */
export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

/**
 * 获取数据库连接URL
 * @returns {string}
 */
export function getDatabaseUrl() {
  return getEnv('DATABASE_URL')
}

/**
 * 获取Redis连接URL
 * @returns {string}
 */
export function getRedisUrl() {
  return getEnv('REDIS_URL', 'redis://localhost:6379')
}

/**
 * 获取加密密钥
 * @returns {string}
 */
export function getEncryptionSecret() {
  return getEnv('ENCRYPTION_SECRET')
}

/**
 * 获取DeepSeek API密钥
 * @returns {string}
 */
export function getDeepSeekApiKey() {
  return getEnv('DEEPSEEK_API_KEY')
}
