<script lang="ts">
    import Navigation from "../Navigation.svelte";
    import Wrapper from "../Wrapper.svelte";
    import Features from "./Features.svelte";
</script>

<Navigation />
<Wrapper>
    <div class="content">
        <aside class="content__features">
            <p class="content__features__description">
                Replit Community Database is a simple and incredibly easy to use key-value
                database solution for your Replit apps. Free, forever.
            </p>

            <Features />
        </aside>
        <main class="content__auth">
            <slot />
        </main>
    </div>
</Wrapper>

<style>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        height: 100vh;
    }

    .content__features__description {
        margin-bottom: 1rem;
    }

    .content__features,
    .content__auth {
        flex: 0 1 50%;
    }
</style>
