import { useEffect } from 'react'

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK
        ApperUI.showPromptPassword('#authentication-prompt-password')
    }, [])

    return (
        <>
            <div className="flex-1 py-12 px-5 flex justify-center items-center bg-dark-950 min-h-screen">
                <div id="authentication-prompt-password" className="bg-dark-900 mx-auto w-[400px] max-w-full p-10 rounded-2xl border border-dark-700"></div>
            </div>
        </>
    )
}

export default PromptPassword