
export const updateTypes = {
    RESET_UPDATE_STATE: 'P2_RESET_UPDATE_STATE',
    RESET_ERROR:'P@_RESET_ERROR'
}

export const resetUpdateActionMapper = () => async (dispatch:any) => {
    // try{
    //     // let currUser = await getUserProfile(userId)
    //     // console.log(currUser)
    //     // //check current user
    //     let noUser = await fellowshipLogout()
    //     console.log("current User is now: " + noUser)
    //     //get back null
        let reset = undefined
        dispatch({
            type:updateTypes.RESET_UPDATE_STATE,
            payload:{
                reset
            }
        })

    }
//     }catch (err) {
//         console.log(err.message)
//         if(err.message.includes('404')){
//             dispatch({
//                 type:logoutTypes.NO_USER_LOGGED_IN
//             })
//         } else{
//             dispatch({
//                 type:logoutTypes.SERVER_ERROR
//             })
//         }        
//     }
// }

export const logoutErrorReset = () => {
    return{
        type:updateTypes.RESET_ERROR

    }

}