export const loginGuard = () => {
    const token = localStorage.getItem('token_user');

    if (!token) {
        return false;
    }

    return true;
}