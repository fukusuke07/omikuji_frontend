import { put, call, select, takeEvery } from 'redux-saga/effects'
import { Action as FSA } from "typescript-fsa";
import { requestFetchScoreApi, requestCreateScoreApi, requestUpdateScoreApi } from "../services/api/scores"
import { signInApi, signUpApi, signOutApi, updateUserApi, deleteUserApi } from "../services/api/auth"
import { User, SignInData, SignUpData, UpdateUserFormData } from "../interfaces/index"
import { Score } from "../interfaces/index"
import { getCurrentUser } from "../services/api/auth"
import { TextInputActions } from'./actions'
import { signInOperation, signUpOperation, signOutOperation,updateUserOperation, deleteUserOperation, fetchUserOperation, fetchScoreOperation, createScoreOperation, updateScoreOperation, clearStateOperation} from "./actions";
import { getCookie,removeCookie,setCookie } from 'typescript-cookie';

type PayloadOf<Op> = Op extends (params: infer P, ...args: any[]) => any ? P : never;

function* fetchUserSaga(action: FSA<PayloadOf<typeof fetchUserOperation>>) {

    const { promise, ...params } = action.payload;

    yield put(TextInputActions.fetchUser.started())

    const {res, error} = yield call(getCurrentUser)

    if (res?.data.status == 200) {
        
        const result = { quote: createUserFromResponseData(res.data.user) };
        promise && promise.resolve(result);
        yield put(TextInputActions.fetchUser.done({ result: createUserFromResponseData(res.data.user) }))
    }else if(res != undefined && res?.data.status != 200){

        const result = { quote: null }
        promise && promise.resolve(result)
        yield put(TextInputActions.fetchUser.failed({ error: res.data.message }))
    } else {

        promise && promise.reject( ["ConnectionError"] );
        yield put(TextInputActions.fetchUser.failed({ error: error }))
    }

}

function* signInSaga(action: FSA<PayloadOf<typeof signInOperation>>) {

    const { promise, signInData, ...params } = action.payload;

    yield put(TextInputActions.signIn.started())

    const { res,error }  = yield call(signInApi, signInData)

    if ( res?.data.status == 200 ) {

        yield put(TextInputActions.signIn.done({ result: createUserFromResponseData(res.data.user) }))
        const result = { quote: createUserFromResponseData(res.data.user) };
        promise && promise.resolve(result);

        /*if(getCookie("_score_data")){

            console.log("score!!")
            const score = decodeCookieScoreData(getCookie("_score_data") as string)
    
            if(isScoreInvalid(score.date)){
                AddUserIDToScore(score)
            }
        }*/

      }
      else if( res && res.data.status != 200 ){
 
        yield put(TextInputActions.signIn.failed({ error: new Error( res.data.message ) }))
        promise && promise.reject( res.data.message );

      }
      else{

        yield put(TextInputActions.signIn.failed({ error: error }))
        if(error.response.data.errors){
            promise && promise.reject( error.response.data.errors );
        }else{
            promise && promise.reject( ["ConnectionError"] );
        }

      }
  }

    function* signUpSaga(action: FSA<PayloadOf<typeof signUpOperation>>){

        const { promise, signUpData, ...params } = action.payload;
    
        yield put(TextInputActions.signUp.started())
    
        const { res,error }  = yield call(signUpApi,signUpData)

        if (res && res.data.status === "success") {

            const result = { quote: createUserFromResponseData(res.data.data) };
            promise && promise.resolve(result);
            yield put(TextInputActions.signUp.done({ result: createUserFromResponseData(res.data.data) }))

            /*if(getCookie("_score_data")){

                const score = decodeCookieScoreData(getCookie("_score_data") as string)
        
                if(isScoreInvalid(score.date)){
                    AddUserIDToScore(score)
                }
            }*/
          }
          else if( res && res.data.status != "success" ){

            promise && promise.reject( res.data.message );
            yield put(TextInputActions.signUp.failed({ error: new Error( "signupfailed") }))
    
          }
          else{
            if(error.response.data.errors.fullMessages){
                promise && promise.reject( error.response.data.errors.fullMessages );
            }else{
                promise && promise.reject( ["ConnectionError"] );
            }
            yield put(TextInputActions.signUp.failed({ error: error }))
    
          }
    }    

    function* signOutSaga(action: FSA<PayloadOf<typeof signOutOperation>>): any {
    
        const { promise, ...params } = action.payload;

        yield put(TextInputActions.signOut.started())
    
        const {res,error}  = yield call(signOutApi)
    
        if (res && res.data.success == true) {

            const result = { quote: "サインアウトしました" };
            promise && promise.resolve(result);
            yield put(TextInputActions.signOut.done({}))
          }else if(res && res.data.success != true){

            promise && promise.reject( res.data.message );
            yield put(TextInputActions.signOut.failed({ error: new Error('signOutFailed') }))

          }
          else{

            promise && promise.reject( ["ConnectionError"] );
            yield put(TextInputActions.signOut.failed({ error: new Error("Error") }))
    
          }
    }    

    function* updateUserSaga(action: FSA<PayloadOf<typeof updateUserOperation>>): any {
    
        const { promise,updateUserFormData, ...params } = action.payload;

        yield put(TextInputActions.updateUser.started())
    
        const {res,error}  = yield call(updateUserApi, updateUserFormData)
    
        if (res && res.data.success == true) {

            const result = { quote: createUserFromResponseData(res.data.data) };
            promise && promise.resolve(result);
            yield put(TextInputActions.updateUser.done({result: createUserFromResponseData(res.data.data)}))
          }else if(res && res.data.success != true){

            promise && promise.reject( res.data.message );
            yield put(TextInputActions.updateUser.failed({ error: new Error('signOutFailed') }))

          }
          else{

            promise && promise.reject( ["ConnectionError"] );
            yield put(TextInputActions.updateUser.failed({ error: new Error("Error") }))
    
          }
    }    

    function* deleteUserSaga(action: FSA<PayloadOf<typeof deleteUserOperation>>): any {
    
        const { promise, ...params } = action.payload;

        yield put(TextInputActions.deleteUser.started())
    
        const {res,error}  = yield call(deleteUserApi)
    
        if (res && res.status.success == true) {

            const result = { quote: "退会処理を行いました" };
            promise && promise.resolve(result);
            yield put(TextInputActions.deleteUser.done({}))
          }else if(res && res.status.success != true){

            promise && promise.reject( res.data.message );
            yield put(TextInputActions.deleteUser.failed({ error: new Error('signOutFailed') }))

          }
          else{

            promise && promise.reject( error.response.data.errors.fullMessages );
            yield put(TextInputActions.deleteUser.failed({ error: new Error("Error") }))
    
          }
    }    

const isScoreInvalid = (date: string) => {
    var dd = new Date()
    var YYYY = dd.getFullYear()
    var MM = ('00' + (dd.getMonth() + 1)).slice(-2)
    var DD = ('00' + dd.getDate()).slice(-2);

    var today  = YYYY + "/" + MM + "/" + DD

    return today == date

}

const createUserFromResponseData = (data:any) =>{

    const user: User ={  
        id: data.id,
        uid: data.uid,
        provider: data.provider,
        email: data.email,
        name: data.name,
        allowPasswordChange: false   
    }

    return user

}

const createScoreFromResponseData = (data:any) =>{

    const score: Score ={
        id: data.score.id,
        userId: data.score.userId,
        totalScore: data.score.totalScore,
        drawCount: data.score.drawCount,
        competitionScore: data.score.competitionScore,
        loveScore: data.score.loveScore,
        moneyScore: data.score.moneyScore,
        population: data.population,
        ranking: data.ranking,
        date: data.date
      }
    return score

}

const decodeCookieScoreData = (cookie:string)=>{

    const json =  JSON.parse(cookie)

    const score: Score ={
        id: json.score.id,
        userId: json.score.userId,
        totalScore: json.score.totalScore,
        drawCount: json.score.drawCount,
        competitionScore: json.score.competitionScore,
        loveScore: json.score.loveScore,
        moneyScore: json.score.moneyScore,
        population: json.population,
        ranking: json.ranking,
        date: json.date
      }
    return score

};

function* fetchScoreFromCookieSaga(){

    const { state } = yield select()

    if(!state.score && getCookie("_score_data")){

        const score = decodeCookieScoreData(getCookie("_score_data") as string)

        if( isScoreInvalid(score.date)){
            
        }
    }
}

function* fetchScoreSaga(action: FSA<PayloadOf<typeof fetchScoreOperation>>) {

    const { promise, ...params } = action.payload;

    let score = null

    yield put(TextInputActions.fetchScore.started())

    const { state } = yield select()

    if(getCookie("_score_data")){

        score = decodeCookieScoreData(getCookie("_score_data") as string)

        if(!score || !isScoreInvalid(score.date)){
            score = null
        }else{
            
            if(state.user && score.userId != state.user.id){
                const {res,error} = yield call(requestFetchScoreApi, state.user.id as number)
  
                if (res && res.data.status == 200) {
        
                    setCookie("_score_data", JSON.stringify(res.data), { expires: 5/1440 })
        
                    score = createScoreFromResponseData(res.data)
        
                    const result = { quote: score };
                    promise && promise.resolve(result);
                    yield put(TextInputActions.fetchScore.done({ result: score }))
        
                    
                }else if(res && res.data.status != 200){

                    score.userId = state.user.id
                    const result = { quote: score }
                    promise && promise.resolve(result)
                    yield put(TextInputActions.fetchScore.done({ result: score }))
        
                } else {
        
                    score = null
                    promise && promise.reject( ["ConnectionError"] );
                    yield put(TextInputActions.fetchScore.failed({ error:new Error("error") }))
                }
            }else{

                console.log("successFetchScoreFromCookie")
                const result = { quote: score }
                promise && promise.resolve(result)
                yield put(TextInputActions.fetchScore.done({ result: score }))
            }
            
        }
    }

    if( state.user && (!score || !state.score || !isScoreInvalid(state.score.date))){

        const {res,error} = yield call(requestFetchScoreApi, state.user.id as number)
  
        if (res && res.data.status == 200) {

            setCookie("_score_data", JSON.stringify(res.data), { expires: 5/1440 })

            score = createScoreFromResponseData(res.data)

            const result = { quote: score };
            promise && promise.resolve(result);
            yield put(TextInputActions.fetchScore.done({ result: score }))

            
        }else if(res && res.data.status != 200){

            score = null
            promise && promise.resolve({ quote: score });
            yield put(TextInputActions.fetchScore.failed({ error: res.data.message }))

        } else {

            score = null
            promise && promise.reject( ["ConnectionError"] );
            yield put(TextInputActions.fetchScore.failed({ error:new Error("error") }))
        }
    
    }else if(state.score && isScoreInvalid(state.score.date)){
        const result = { quote: state.score };
        promise && promise.resolve(result);
        yield put(TextInputActions.fetchScore.done({ result: state.score }))
    }else{
        const result = { quote: null };
        promise && promise.resolve(result);
        yield put(TextInputActions.fetchScore.failed({ error:new Error("error") }))
    }
}

function* createScoreSaga(action: FSA<PayloadOf<typeof createScoreOperation>>) {

    const { promise, ...params } = action.payload;

    yield put(TextInputActions.createScore.started())

    const { state } = yield select()

    var competitionScore = Math.floor(Math.random() * 100);
    var loveScore = Math.floor(Math.random() * 100);
    var moneyScore = Math.floor(Math.random() * 100);
    var totalScore = competitionScore+loveScore+moneyScore;
  
    const score: Score ={
      userId: state.user?.id,
      totalScore: totalScore,
      drawCount: 1,
      competitionScore: competitionScore,
      loveScore: loveScore,
      moneyScore: moneyScore,
      date: ""
    }

    const {res,error}  = yield call(requestCreateScoreApi, score)
  
    if (res && res.data.status == 200) {

        setCookie("_score_data", JSON.stringify(res.data), { expires: 5/1440 })

        const result = { quote: createScoreFromResponseData(res.data) };
        promise && promise.resolve(result);
        yield put(TextInputActions.createScore.done({ result: createScoreFromResponseData(res.data) }))
    }else if(res && res.data.status != 200){

        promise && promise.reject( res.data.message );
        yield put(TextInputActions.createScore.failed({ error: res.data.message }))

    } else {

        promise && promise.reject( ["ConnectionError"] );
        yield put(TextInputActions.createScore.failed({ error:new Error("error") }))
    }

}

function* updateScoreSaga(action: FSA<PayloadOf<typeof updateScoreOperation>>) {

    const { promise, ...params } = action.payload;

    yield put(TextInputActions.updateScore.started())

    const { state } = yield select()

    if(state.score && state.score.drawCount < 2 && state.user){

        var competitionScore = Math.floor(Math.random() * 100);
        var loveScore = Math.floor(Math.random() * 100);
        var moneyScore = Math.floor(Math.random() * 100);
        var totalScore = competitionScore+loveScore+moneyScore;
      
        const score: Score ={
          id: state.score.id,
          userId: state.user.id,
          totalScore: totalScore,
          drawCount: state.score.drawCount + 1,
          competitionScore: competitionScore,
          loveScore: loveScore,
          moneyScore: moneyScore,
          date: state.score.date
        }

        const {res, error} = yield call(requestUpdateScoreApi, score)
  
        if (res && res.data.status == 200) {

            setCookie("_score_data", JSON.stringify(res.data), { expires: 5/1440 })
    
            const result = { quote: createScoreFromResponseData(res.data) };
            promise && promise.resolve(result);
            yield put(TextInputActions.updateScore.done({ result: createScoreFromResponseData(res.data) }))
        }else if(res && res.data.status != 200){
    
            promise && promise.reject( res.data.message );
            yield put(TextInputActions.updateScore.failed({ error: res.data.message }))
        } else {

            promise && promise.reject( error.response.data.errors.fullMessages );
            yield put(TextInputActions.updateScore.failed({ error: error }))
        }

    }else if(state.score && state.user){

        const {res,error} = yield call(requestFetchScoreApi, state.user.id as number)
  
        if (res && res.data.status == 200) {

            setCookie("_score_data", JSON.stringify(res.data), { expires: 5/1440 })

            const score = createScoreFromResponseData(res.data)

            const result = { quote: score };
            promise && promise.resolve(result);
            yield put(TextInputActions.updateScore.done({ result: score }))
            
        }else if(res && res.data.status != 200){

            const result = { quote: state.score };
            promise && promise.resolve(result);
            yield put(TextInputActions.updateScore.done({ result: state.score }))

        } else {

            promise && promise.reject( ["ConnectionError"] );
            yield put(TextInputActions.fetchScore.failed({ error: error }))
        }

    }else if(state.score){

        const result = { quote: state.score };
        promise && promise.resolve(result);
        yield put(TextInputActions.updateScore.done({ result: state.score }))
    }else{

        promise && promise.reject( ["ConnectionError"] );
        yield put(TextInputActions.updateScore.failed({ error: new Error('error') }))
    }

    
}

function* clearStateSaga(action: FSA<PayloadOf<typeof clearStateOperation>>){

    const { promise, ...params } = action.payload;

    yield put(TextInputActions.clearState.started())
    removeCookie("_access_token")
    removeCookie("_client")
    removeCookie("_uid")
    removeCookie("_score_data")
    promise && promise.resolve({quote: "success"});
    yield put(TextInputActions.clearState.done({}))
}

function* AddUserIDToScore(score:Score){
    yield put(TextInputActions.updateScore.started())

    const { state } = yield select()

    if(state.user){
        score.userId = state.user.id
    }

    const {res,error} = yield call(requestUpdateScoreApi, score)
  
    if (res && res.data.status == 200) {

        yield put(TextInputActions.updateScore.done({ result: createScoreFromResponseData(res.data) }))
    }else if(res && res.data.status != 200){

        yield put(TextInputActions.updateScore.failed({ error: res.data.message }))

    } else {

        yield put(TextInputActions.updateScore.failed({ error: error }))
    }
    

}


export function* rootSaga() {
    yield takeEvery(signInOperation, signInSaga);
    yield takeEvery(signUpOperation, signUpSaga);
    yield takeEvery(signOutOperation, signOutSaga);
    yield takeEvery(deleteUserOperation, deleteUserSaga);
    yield takeEvery(fetchUserOperation, fetchUserSaga);
    yield takeEvery(fetchScoreOperation, fetchScoreSaga);
    yield takeEvery(createScoreOperation, createScoreSaga);
    yield takeEvery(updateScoreOperation, updateScoreSaga);
    yield takeEvery(clearStateOperation, clearStateSaga);
  }