
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from "../config/axios"


export const login = createAsyncThunk('/user/login', async ({ email, password }, { rejectWithValue }) =>
{

    try {
        const response = await axios.post('/user/signin', { email, password });
        localStorage.setItem('token', response.data.token)
        toast.success("login Successfull")
        console.log(response.data.user.role)
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        return rejectWithValue(error.message);
    }

})

export const signup = createAsyncThunk('/user/signup', async ({ name, email, password, role }, { rejectWithValue }) =>
{

    try {
        const response = await axios.post('/user/signup', { name, email, password, role });
        toast.success("Signup Successfull")
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        return rejectWithValue(error.message);
    }

})

// export const getAllUser = createAsyncThunk('/admin/allusers', async (_, { rejectWithValue }) =>
// {

//     try {
//         const response = await axios.get('/user/allusers')
//         return response.data
//     }
//     catch (error) {
//         return rejectWithValue(error.message);

//     }
// })

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch }) =>
{
    localStorage.removeItem('user');
    dispatch(resetUser());
    toast.success("Logged out successfully");
});

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    user: null,
    isAdmin: false,
    users: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        resetUser: (state) =>
        {
            state.user = null,
                loading = false,
                error = null,
                success = false,
                user = null,
                isAdmin = false,
                users = null
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(signup.pending, (state) =>
            {
                state.loading = true;
            })

            .addCase(signup.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.success = true;
            })

            .addCase(signup.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(login.pending, (state) =>
            {
                state.loading = true;
                state.success = false;
            })

            .addCase(login.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                console.log(action.payload.user)
                state.isAdmin = action.payload.user.role === 'ADMIN';
            })

            .addCase(login.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
        // .addCase(getAllUser.loading, (state) =>
        // {
        //     state.loading = true;
        // })
        // .addCase(getAllUser.fulfilled, (state, action) =>
        // {
        //     state.users = action.payload.users
        // })
    }
})


export const { resetUser } = authSlice.actions;

export default authSlice.reducer;