const handle = (override: Record<string, any> = {}) => ({
    label: "Post Handle",
    name: "handle",
    widget: "string",
    ...override
})

const title = (override: Record<string, any> = {}) => ({
    label: "Title",
    name: "title",
    widget: "string",
    ...override
})

const body = (override: Record<string, any> = {}) => ({
    label: "Body",
    name: "body",
    widget: "markdown",
    ...override
})

const image = (override: Record<string, any> = {}) => ({
    label: "Image",
    name: "image",
    widget: "object",
    fields: [
        {
            label: "Address",
            name: "src",
            widget: "string"
        },
        {
            label: "Description",
            name: "alt",
            required: false,
            widget: "string"
        }
    ],
    ...override
})

const items = (override: Record<string, any> = {}, additionalFields: any[] = []) => ({
    label: "Items",
    name: "items",
    widget: "list",
    fields: [
        {
            label: "Label",
            name: "label",
            widget: "string"
        },
        {
            label: "Link",
            name: "href",
            widget: "string"
        },
        ...additionalFields
    ],
    ...override
})

const site_url = import.meta.env.VITE_BASE_URL as string

export const config = {
    backend: {
        name: "git-gateway"
    },
    local_backend: true,
    load_config_file: false,
    media_folder: "static/uploads",
    public_folder: "/uploads",
    site_url,
    display_url: site_url,
    logo_url: `${site_url}/images/logo.svg`,
    collections: [
        {
            name: "posts",
            label: "Blog Posts",
            label_singular: "Blog Post",
            folder: "src/lib/data/posts",
            create: true,
            identifier_field: "handle",
            format: "json",
            fields: [handle(), title(), image(), body()]
        },
        {
            name: "products",
            label: "Products",
            label_singular: "Product",
            folder: "src/lib/data/products",
            create: true,
            identifier_field: "handle",
            format: "json",
            fields: [
                handle(),
                {
                    label: "API Product ID",
                    name: "id",
                    widget: "string"
                },
                body()
            ]
        },
        {
            name: "pages",
            label: "Pages",
            label_singular: "Page",
            folder: "src/lib/data/pages",
            create: true,
            identifier_field: "handle",
            format: "json",
            fields: [handle(), title(), image(), body()]
        },
        {
            name: "collections",
            label: "Collections",
            label_singular: "Collection",
            folder: "src/lib/data/collections",
            create: true,
            identifier_field: "handle",
            format: "json",
            fields: [
                handle(),
                title(),
                image(),
                {
                    label: "Products",
                    name: "products",
                    widget: "relation",
                    collection: "products",
                    value_field: "handle",
                    search_fields: ["handle"],
                    multiple: true,
                    min: 1
                },
                body()
            ]
        },
        {
            name: "menus",
            label: "Menus",
            files: [
                {
                    label: "Primary Menu",
                    name: "primaryMenu",
                    file: "src/lib/data/primaryMenu.json",
                    fields: [
                        items({ label: "Level 0 Items" }, [
                            items({ label: "Level 1 (Image) Items" }, [
                                {
                                    label: "Image Address",
                                    name: "src",
                                    widget: "string",
                                    required: false
                                },
                                items({ label: "Level 2 (Leaf) Items" })
                            ])
                        ])
                    ]
                },
                {
                    label: "Secondary Menu",
                    name: "secondaryMenu",
                    file: "src/lib/data/secondaryMenu.json",
                    fields: [
                        items({ label: "Level 0 Items" }, [
                            items({ label: "Level 1 (Leaf) Items" })
                        ])
                    ]
                }
            ]
        }
    ]
}
