import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./redux-hook";
import { favoritesActions } from "../app/store/slices/favoritesSlice";

const actions = {
    ...favoritesActions
}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(actions, dispatch)
}