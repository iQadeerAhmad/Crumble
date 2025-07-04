// app.config.js
export default {
    expo: {
        name: "Crumble",
        slug: "crumble",
        plugins: [
            [
                "expo-router",
                {
                    root: "./src/app"  // ✅ ✅ ✅ not "appRoot"
                }
            ]
        ]
    }
};
