import CryptoJS from 'crypto-js'

// 从环境变量获取加密密钥
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'default-secret-key-change-this-32ch'

/**
 * 加密文本
 * @param {string} text - 需要加密的文本
 * @returns {string} 加密后的文本
 */
export function encrypt(text) {
  if (!text) return ''
  try {
    return CryptoJS.AES.encrypt(text, ENCRYPTION_SECRET).toString()
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

/**
 * 解密文本
 * @param {string} ciphertext - 加密的文本
 * @returns {string} 解密后的文本
 */
export function decrypt(ciphertext) {
  if (!ciphertext) return ''
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_SECRET)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}

/**
 * 生成哈希值
 * @param {string} text - 需要哈希的文本
 * @returns {string} SHA256 哈希值
 */
export function hash(text) {
  return CryptoJS.SHA256(text).toString()
}

/**
 * 验证哈希值
 * @param {string} text - 原始文本
 * @param {string} hashedText - 哈希值
 * @returns {boolean} 是否匹配
 */
export function verifyHash(text, hashedText) {
  return hash(text) === hashedText
}

/**
 * 生成随机密钥
 * @param {number} length - 密钥长度
 * @returns {string} 随机密钥
 */
export function generateRandomKey(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
