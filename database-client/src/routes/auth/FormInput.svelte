<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import Icon from "@iconify/svelte";

    interface $$Props extends Partial<HTMLInputAttributes> {
        icon: string;
    }

    export let icon: $$Props["icon"];
</script>

<div class="input">
    <div class="input__icon">
        <Icon {icon} />
    </div>

    <input class="input__target" {...$$props} />
</div>

<style>
    .input {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background-color: white;
        border-radius: 0.5rem;
    }

    .input__icon {
        --size: 2rem;

        height: var(--size);
        width: var(--size);
        flex: 0 0 var(--size);
        display: grid;
        place-items: center;
        background-color: var(--color-white);
        color: var(--color-primary);
        border-radius: 0.25rem;
    }

    .input__target {
        height: 100%;
        width: 100%;
        flex: 1 1 100%;
        border: none;
        outline: none;
        background-color: transparent;
        font-family: inherit;
        font-size: 100%;
    }
</style>
