import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import { timeout } from "rxjs"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 3000
}), options)

export default client