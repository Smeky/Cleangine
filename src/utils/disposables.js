
export const disposables = () => {
    const disposables = []

    return {
        add: (disposable) => { disposables.push(disposable); return disposable },
        dispose: () => disposables.forEach(disposable => disposable.dispose?.())
    }
}
