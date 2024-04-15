<template>
    <div class="custom-container">
        <div>
            <h1>Sign In</h1>
            <el-form>
                <el-form-item label="Username">
                    <el-input v-model="username" placeholder="Enter your username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password" placeholder="Enter your password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">Login</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loginError: false,
        };
    },
    methods: {
        login() {
            if (this.username === '' || this.password === '') {
                this.loginError = true;
            } else {
                // Perform login logic here
            }
        },
    },
};

</script>
  
<style scoped>
.custom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>