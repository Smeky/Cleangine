
export const createSimpleIdGenerator = () => {
    let id = 0

    return () => id++
}
