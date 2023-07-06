<script lang="ts">
    export let text: string;
</script>

<button class="button">{text}</button>

<style>
    .button {
        padding: 0.75rem;
        width: 100%;
        background-color: var(--color-primary);
        color: var(--color-white);
        border-radius: 0.5rem;
        font-size: 100%;
        font-family: inherit;
        border: none;
        outline: none;
        cursor: pointer;
    }
</style>
