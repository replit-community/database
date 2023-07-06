<script lang="ts">
    import FeatureItem from "./FeatureItem.svelte";

    const features = [
        "Store up to 5 MB (for this demo only)",
        "Up to 10,000 API requests (for this demo only)",
        "Completely open source",
        "Interactive database explorer",
        "Protected, permission-based JSON bins"
    ];
</script>

<ul class="features">
    {#each features as feature}
        <FeatureItem text={feature} />
    {/each}
</ul>

<style>
    .features {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }
</style>
