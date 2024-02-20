import { SignInData, SignUpData, User } from "../../interfaces/index";

import { connect } from "react-redux";
import {  bindActionCreators,Dispatch } from "redux";

import {
         signInOperation,
         signUpOperation,
         signOutOperation,
         updateUserOperation,
         deleteUserOperation,
         fetchUserOperation,
         fetchScoreOperation,
         createScoreOperation,
         updateScoreOperation,
         clearStateOperation
        } from "../actions";

import   AppPageForm   from "../../AppPageForm";

import { AppState } from "../store";

export interface AppHandler {
    handleOnSignIn(
        signInData: SignInData, 
        delay: number, 
        promise?: {
            resolve(result: { quote: User }): void;
            reject(error: Error): void;
        }):void
    handleOnSignUp(value:SignUpData):void
    handleOnSignOut():void
    handleOnFetchUser(): void
    handleOnFetchScore(): void
    handleOnCreateScore(): void
    handleOnUpdateScore(): void
}

function mapStateToProps (appState: AppState) {
    return {
        loading: appState.state.loading,
        user: appState.state.user,
        score:appState.state.score,
        error:appState.state.error
    }
}

function mapDispatchToProps (dispatch: Dispatch) {

    return{
        actions:bindActionCreators({
            signInOperation,
            signUpOperation,
            signOutOperation,
            updateUserOperation,
            deleteUserOperation,
            fetchUserOperation,
            fetchScoreOperation,
            createScoreOperation,
            updateScoreOperation,
            clearStateOperation,
        },dispatch
        )
 
    }
  
}

export type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(AppPageForm)