type BuildExpression = string | boolean
type BuildExpressionMaybeList = BuildExpression | BuildExpression[]

function parseBuildExpressions(listOrSingleton: BuildExpressionMaybeList) {
    const list = Array.isArray(listOrSingleton) ? listOrSingleton : [listOrSingleton]
    return list
        .filter(Boolean)
        .flatMap((x: string) => x?.split(" "))
        .filter(Boolean)
}

export function buildClasses(...list: BuildExpression[]) {
    return parseBuildExpressions(list).join(" ")
}

export function classes(node: HTMLElement, listOrSingleton: BuildExpressionMaybeList) {
    let last: string[] = []

    function update(listOrSingleton: BuildExpressionMaybeList = []) {
        node.classList.remove(...last)

        const next = parseBuildExpressions(listOrSingleton)

        node.classList.add(...next)

        last = next
    }

    update(listOrSingleton)

    return {
        update
    }
}
