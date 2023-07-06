<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
</script>

<header class="navigation">
    <Wrapper>
        <div class="navigation__children">
            <div class="navigation__logo">
                Database <span class="navigation__logo__version">Replit Community</span>
            </div>
            <nav class="navigation__links">
                <a
                    class="navigation__link"
                    href="https://github.com/replit-community/database"
                    target="_blank"
                    rel="noreferrer">Github</a
                >
                <a class="navigation__link" href="/auth/login">Login</a>
                <a class="navigation__link" href="/auth/signup">Create Account</a>
            </nav>
        </div>
    </Wrapper>
</header>

<style>
    .navigation {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 1.5rem;
    }

    .navigation__children {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .navigation__logo {
        font-family: var(--font-kanit);
        font-size: 1.125rem;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        vertical-align: top;
    }

    .navigation__logo__version {
        display: inline-flex;
        font-size: 0.5rem;
        padding: 0.25rem 0.35rem;
        border-radius: 1rem;
        background-color: var(--color-secondary);
    }

    .navigation__links {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .navigation__link {
        color: var(--color-primary-darker);
    }
</style>
