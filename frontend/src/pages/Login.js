import FormTemplate from "../components/FormTemplate";

function Login() {
    return <FormTemplate route="/api/token/" method="login" />
}

export default Login;