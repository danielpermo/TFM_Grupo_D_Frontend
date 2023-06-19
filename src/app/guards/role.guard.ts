import jwtDecode from "jwt-decode";

export const roleGuard = () => {
    const token = localStorage.getItem('token_user');
    const tokenDecode = jwtDecode<any>(token!);

    return tokenDecode.usuario_rol === 'admin';
}