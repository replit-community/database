<script>
    import FormButton from "../FormButton.svelte";
    import FormInput from "../FormInput.svelte";
</script>

<h1 class="title">Create an Account</h1>
<form action="" class="form">
    <FormInput name="email" placeholder="Email" type="email" icon="mingcute:mail-line" />
    <FormInput name="username" placeholder="Username" type="text" icon="mingcute:user-3-line" />
    <FormInput name="password" placeholder="Password" type="password" icon="mingcute:lock-line" />
    <FormInput
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        icon="mingcute:lock-line"
    />

    <FormButton text="Create Account" />
</form>

<style>
    .title {
        font-size: 2rem;
    }

    .form {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
</style>
