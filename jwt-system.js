const crypto = require('crypto') // cryptoはNode.jsが提供する暗号化のモジュール

const base64 = json => {
    const jsonStr = JSON.stringify(json)

    // ①Buffer.fromでutf-8に変換
    // ②toString('base64')で64進法に変換
    const jsonB64 = Buffer.from(jsonStr).toString('base64')
    // 空白の除去 
    const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '')
    return jsonB64NoPadding
}

const HMAC_SHA256 = (key, data) => {
    // 秘密鍵とHMAC-SHA256を用いて署名を作成
    const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
    const hashNoPadding = hash.replace(/={1,2}$/, '')
    return hashNoPadding
}

const header = { alg: 'HS256', typ: 'JWT' }
const payload = { sub: '1234567890', iat:1516239022 }
const key = 'secret'
const unsignedToken = `${base64(header)}.${base64(payload)}`
const signature = HMAC_SHA256(key, unsignedToken)
const jwt = `${unsignedToken}.${signature}`

console.log(jwt)