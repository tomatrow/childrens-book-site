const config = {
  "extensions": [".svelte.md", ".md", ".svx"],

  "smartypants": {
    "dashes": "oldschool"
  },
  "layout": {
    _: "./src/layouts/_.svelte",
    blog: "./src/layouts/blog.svelte"
  },
  "remarkPlugins": [],
  "rehypePlugins": []
};

export default config;