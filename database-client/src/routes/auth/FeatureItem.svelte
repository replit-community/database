<script lang="ts">
    import Icon from "@iconify/svelte";

    export let text: string;
</script>

<li class="feature-item">
    <Icon icon="mingcute:check-line" />
    <span class="feature-item__text">{text}</span>
</li>

<style>
    .feature-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>
