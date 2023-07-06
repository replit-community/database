<script lang="ts">
    import Navigation from "../Navigation.svelte";
    import Features from "./Features.svelte";
</script>

<div class="content-wrapper">
    <Navigation />
    <div class="content">
        <main>
            <slot />
        </main>
        <aside>
            <h1>What's included?</h1>
            <p>
                Replit Community (Dev) Database is a simple and incredibly easy to use key-value
                database solution for your Replit apps. Free, forever.
            </p>

            <Features />
        </aside>
    </div>
</div>
