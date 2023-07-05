import { defineConfig, configDefaults } from "vitest/config";

// https://stackoverflow.com/questions/74088103/vitest-how-to-exclude-specific-files-and-folders
export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, "**/__utils__/**"],
    },
});
