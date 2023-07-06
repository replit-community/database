<script lang="ts">
    import Icon from "@iconify/svelte";

    export let text: string;
</script>

<li class="feature-item">
    <div class="feature-item__icon">
        <Icon icon="mingcute:check-line" />
    </div>
    <span class="feature-item__text">{text}</span>
</li>

<style>
    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .feature-item__icon {
        --diameter: 1.75rem;

        height: var(--diameter);
        width: var(--diameter);
        border-radius: 100%;
        display: grid;
        place-items: center;
        background-color: var(--color-primary);
        color: var(--color-white);
    }
</style>
