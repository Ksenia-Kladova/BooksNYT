export function checkUser() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const login = !!isLoggedIn

    return login;
}