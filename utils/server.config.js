const mode = "dev";

function config() {
    let cfg = []

    cfg["dev"] = {
        MONGO_URI: "mongodb://127.0.0.1:27017/ecom",
        PORT: 3001,
        API_URL: `http://127.0.0.1:3001`,
    }

    cfg["prod"] = {
        PORT: 3001,
        API_URL: "https://72.60.219.158:3001",
        MONGO_URI: "mongodb+srv://rahamatj:dhRmfxWw5NFHBMDc@ecom.m8h6nnq.mongodb.net/?appName=ecom"
        // MONGO_URI: "mongodb://127.0.0.1:27017/ecom"
    }

    return cfg[mode];
}

export default config