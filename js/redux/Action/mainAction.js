/**
 * Created by git on 17/9/6.
 */
export const show = (status) => {
    return {
        status,
        type: 'SHOW',

    };
};

export const dismiss = (status) => {
    return {
        status,
        type: 'DISMISS',
    };
};


export const showClick = (status) => {
    return (dispatch, getState) => {
        console.log('showClick_status: ', status);
        dispatch(show(status));
    }
};


export const dismissClick = (status) => {
    return (dispatch, getState) => {
        console.log('dismissClick_status: ', status);
        dispatch(dismiss(status));
    }
};

export const toDoClick = (type, status) => {
    return (dispatch, getState) => {
        console.log('toDo_status: ', status);
        dispatch({
            type: type,
            status
        });
    }
}

export const changeColor = (type, status) => {
    return (dispatch, getState) => {
        console.log('changeColor_status: ', status);
        dispatch({
            type: type,
            status
        });
    }
}