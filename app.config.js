// app.config.js
export default {
    expo: {
        name: "Crumble",
        scheme: "crumble",
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
