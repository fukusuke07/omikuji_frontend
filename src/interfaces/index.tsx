export interface SignUpData {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
  
  export interface SignUpFormData extends FormData {
    append(name: keyof SignUpData, value: String | Blob, fileName?: string): any
  }
  
  // サインイン
  export interface SignInData {
    email: string
    password: string
  }
  
  // ユーザー
  export interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    allowPasswordChange: boolean
    createdAt?: Date
    updatedAt?: Date
  }

  export interface ApiResponseUserData {
    user: User
    status: number
  }
  
  export interface UpdateUserData {
    id: number | undefined | null
    name?: string 
  }
  
  export interface UpdateUserFormData extends FormData {
    append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any
  }
  
  // スコア
  export interface Score {
    id?: number
    userId?: number | undefined | null
    totalScore: number
    drawCount?: number
    competitionScore: number
    loveScore: number
    moneyScore: number
    ranking?: number
    population?: number
    date:string
  }

  export interface ApiResponseScoreData {
    score: Score
    status: number
  }

  export interface Policy {
    policy:{
        privacy:{
            title:string
            body:string
            key:string
        }[]
    }
  }

  
